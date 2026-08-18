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
                <p className="mt-5 max-w-[46ch] text-muted-foreground">
                    Scroll through — each project stacks, pauses, and shows a
                    preview with the full story beside it.
                </p>
            </div>

            <StackedProjectCards projects={PROJECTS} />
        </section>
    );
};

export default ProjectList;
