export interface TrackOptions {
    height: number;
    color: string;
    radius: number;
    class?: string;
    connecting?: {
        color: string;
        padding: number;
        radius: number;
        class?: string;
    } | null;
}

export interface ThumbOptions {
    color: string;
    size: number;
    radius: number;
    class?: string;
    border?: {
        size: number;
        color: string;
    } | null;
}

export interface SliderOptions {
    min: number;
    max: number;
    step: number;
}