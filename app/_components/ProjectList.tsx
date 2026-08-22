'use client';

import { StackedProjectCards } from '@/components/ui/glass-cards';
import { PROJECTS } from '@/lib/data';

const ProjectList = () => {
    return (
        <section className="pt-section" id="selected-projects">
            <div className="container mb-10 md:mb-14">
                <h2 className="font-anton text-[clamp(2.75rem,9vw,5rem)] leading-none text-primary lowercase">
                    selected projects.
                </h2>
                <p className="mt-5 max-w-[46ch] text-muted-foreground leading-relaxed">
                    Engineering case studies — AI systems, signal pipelines,
                    and full-stack products. Click through for the technical
                    depth.
                </p>
            </div>

            <StackedProjectCards projects={PROJECTS} />
        </section>
    );
};

export default ProjectList;
