import { BaseEntity } from './../../shared';

export const enum Language {
    'FRENCH',
    'ENGLISH',
    'SPANISH'
}

export class DemoA implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public number?: number,
        public bigDecimalNum?: number,
        public floatNum?: number,
        public doubleNum?: number,
        public languageEnum?: Language,
        public blobNumContentType?: string,
        public blobNum?: any,
        public anyBlobNumContentType?: string,
        public anyBlobNum?: any,
        public imageBlobNumContentType?: string,
        public imageBlobNum?: any,
        public textBlobNum?: any,
        public booleanCheck?: boolean,
        public localDateWhen?: any,
        public dateTimeWhen?: any,
        public zonedDateTimeWhen?: any,
        public instantType?: any,
        public demoBName?: string,
        public demoBId?: number,
        public demoEName?: string,
        public demoEId?: number,
        public demoDS?: BaseEntity[],
    ) {
        this.booleanCheck = false;
    }
}
