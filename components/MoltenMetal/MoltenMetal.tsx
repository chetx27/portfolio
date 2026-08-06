'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './MoltenMetal.css';

const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [1, 1, 1];
    return [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
    ];
};

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uScale;
uniform float uDetail;
uniform float uGlow;
uniform float uCoreSize;
uniform float uSwirl;
uniform float uFold;
uniform float uBlackPoint;
uniform float uBrightness;
uniform float uColorMode;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform bool uEnableMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;
  if (uEnableMouse) p += (uMouse - 0.5) * uMouseStrength * 2.0;
  vec2 i = p; float c = 0.0;
  float r = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5);
  float rot = length(p) + time + p.x * uSwirl;
  mat2 warp = mat2(cos(rot - sin(time/5.0)), sin(rot), -sin(cos(rot)-time), cos(rot)) * uFold;
  for (float n = 0.0; n < 8.0; n++) {
    if (n >= uDetail) break;
    p *= warp;
    float t = r - time / (n + 3.0);
    i -= p + vec2(cos(t-i.x-r)+sin(t+i.y), sin(t-i.y)+cos(t+i.x)+r);
    c += uGlow * uCoreSize / length(vec2(sin(i.x+t), cos(i.y+t)));
  }
  c /= 6.0;
  float g = clamp(max(c - uBlackPoint, 0.0) * uBrightness, 0.0, 1.0);
  float mid = uColorMode > 1.5 ? 0.65 : uColorMode > 0.5 ? 0.35 : 0.5;
  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, mid, g));
  col = mix(col, uColor3, smoothstep(mid, 1.0, g));
  float a = g;
  if (uGrain > 0.5) a += (hash(gl_FragCoord.xy + iTime) - 0.5) * uGrainIntensity;
  fragColor = vec4(col * clamp(a,0.0,1.0), clamp(a,0.0,1.0) * uOpacity);
}`;

type Ctx = {
    renderer: Renderer;
    program: Program;
    mesh: Mesh;
};

const ctxMap = new WeakMap<HTMLElement, Ctx>();

interface MoltenMetalProps {
    color1?: string;
    color2?: string;
    color3?: string;
    speed?: number;
    scale?: number;
    detail?: number;
    glow?: number;
    coreSize?: number;
    mouseInteraction?: boolean;
    mouseStrength?: number;
    opacity?: number;
    className?: string;
}

export default function MoltenMetal({
    color1 = '#485d60',
    color2 = '#b5c7b7',
    color3 = '#e3eae4',
    speed = 0.35,
    scale = 4,
    detail = 3,
    glow = 1.6,
    coreSize = 0.1,
    mouseInteraction = true,
    mouseStrength = 0.3,
    opacity = 0.85,
    className = '',
}: MoltenMetalProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const renderer = new Renderer({
            webgl: 2,
            alpha: true,
            premultipliedAlpha: true,
            antialias: false,
            dpr: Math.min(window.devicePixelRatio || 1, 2),
        });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        const canvas = gl.canvas as HTMLCanvasElement;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        container.appendChild(canvas);

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new Float32Array([1, 1]) },
                uSpeed: { value: speed },
                uScale: { value: scale },
                uDetail: { value: detail },
                uGlow: { value: glow },
                uCoreSize: { value: coreSize },
                uSwirl: { value: 1 },
                uFold: { value: -0.2 },
                uBlackPoint: { value: 0.05 },
                uBrightness: { value: 1.3 },
                uColorMode: { value: 0 },
                uGrain: { value: 1 },
                uGrainIntensity: { value: 0.05 },
                uOpacity: { value: opacity },
                uMouse: { value: new Float32Array([0.5, 0.5]) },
                uMouseStrength: { value: mouseStrength },
                uEnableMouse: { value: mouseInteraction },
                uColor1: { value: new Float32Array(hexToRgb(color1)) },
                uColor2: { value: new Float32Array(hexToRgb(color2)) },
                uColor3: { value: new Float32Array(hexToRgb(color3)) },
            },
        });
        const mesh = new Mesh(gl, { geometry, program });
        ctxMap.set(container, { renderer, program, mesh });

        const setSize = () => {
            const rect = container.getBoundingClientRect();
            renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height));
            const res = program.uniforms.iResolution.value as Float32Array;
            res[0] = gl.drawingBufferWidth;
            res[1] = gl.drawingBufferHeight;
            renderer.render({ scene: mesh });
        };
        const ro = new ResizeObserver(setSize);
        ro.observe(container);
        setSize();

        const targetMouse = [0.5, 0.5];
        const currentMouse = [0.5, 0.5];
        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            targetMouse[0] = (e.clientX - rect.left) / rect.width;
            targetMouse[1] = 1 - (e.clientY - rect.top) / rect.height;
        };
        const onLeave = () => {
            targetMouse[0] = 0.5;
            targetMouse[1] = 0.5;
        };
        canvas.addEventListener('mousemove', onMove);
        canvas.addEventListener('mouseleave', onLeave);

        let raf = 0;
        const t0 = performance.now();
        const loop = (t: number) => {
            program.uniforms.iTime.value = (t - t0) * 0.001;
            currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
            currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
            (program.uniforms.uMouse.value as Float32Array)[0] =
                currentMouse[0];
            (program.uniforms.uMouse.value as Float32Array)[1] =
                currentMouse[1];
            renderer.render({ scene: mesh });
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            canvas.removeEventListener('mousemove', onMove);
            canvas.removeEventListener('mouseleave', onLeave);
            ctxMap.delete(container);
            try {
                container.removeChild(canvas);
            } catch {
                /* empty */
            }
        };
    }, [
        color1,
        color2,
        color3,
        speed,
        scale,
        detail,
        glow,
        coreSize,
        mouseInteraction,
        mouseStrength,
        opacity,
    ]);

    return (
        <div
            ref={containerRef}
            className={`molten-metal-container${mouseInteraction ? ' interactive' : ''} ${className}`.trim()}
        />
    );
}
