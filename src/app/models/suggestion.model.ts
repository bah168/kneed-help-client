export class Suggestion {
    constructor (
        public id: string,
        public name: string,
        public link: string,
        public video_start: string,
        public video_end: string,
        public description: string,
        public active: boolean
    ) { }
}
