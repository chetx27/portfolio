'use client';

import SectionTitle from '@/components/SectionTitle';
import { StackedProjectCards } from '@/components/ui/glass-cards';
import { PROJECTS } from '@/lib/data';

const ProjectList = () => {
    return (
        <section className="pt-section" id="selected-projects">
            <div className="container mb-8 md:mb-12">
                <SectionTitle title="SELECTED PROJECTS" />
                <p className="-mt-6 max-w-[46ch] text-muted-foreground">
                    Scroll through — each project stacks, pauses, and shows a
                    preview with the full story beside it.
                </p>
            </div>

            <StackedProjectCards projects={PROJECTS} />
        </section>
    );
};

export default ProjectList;
