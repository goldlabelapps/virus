
export type T_Fingerprint = {
    id: string;
    name: string;
    created: number;
    updated: number;
    device: {
        platform: string;
        model?: string;
        modelCode?: string;
        vendor: string;
        languages: string[];
        os: string;
        isMobile: boolean;
        browser: string;
    };
};

export type T_Email = {
    from: {
        label: string;
        email: string;
    },
    to: {
        label: string;
        email: string;
    }
    subject: string;
    body: string; // Markdown or HTML content?  
    template?: string;

};
