export type Next_Page_Url = string;
// UrlObject;
// | __next_route_internal_types__.StaticRoutes
// | __next_route_internal_types__.DynamicRoutes;

export type Variant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
    | 'no-color';

export interface IProjectCaseStudy {
    problem: string;
    whyInteresting?: string;
    built: string[];
    technical: string[];
    challenge?: string;
    impact?: string;
}

export interface IProject {
    title: string;
    year: number;
    description: string;
    highlight?: string;
    role: string;
    techStack: string[];
    thumbnail: string;
    longThumbnail: string;
    images: string[];
    slug: string;
    liveUrl?: string;
    sourceCode?: string;
    caseStudy?: IProjectCaseStudy;
}

export interface IExperienceRole {
    title: string;
    duration: string;
    skills?: string[];
    contribution?: string;
}

export interface IExperience {
    company: string;
    logo: string;
    employmentType?: string;
    location?: string;
    roles: IExperienceRole[];
    blockColor: string;
    blockTextColor: string;
}
