declare module 'meshline' {
    export class MeshLineGeometry extends THREE.BufferGeometry {
        constructor();
        setPoints(points: THREE.Vector3[] | Float32Array): void;
    }
    export class MeshLineMaterial extends THREE.Material {
        constructor(parameters?: Record<string, unknown>);
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            meshLineGeometry: Record<string, unknown>;
            meshLineMaterial: Record<string, unknown>;
        }
    }
}

export {};
