export interface IGeolocationPosition {
    readonly coords: IGeolocationCoordinates;
    readonly timestamp: number;
}

interface IGeolocationCoordinates {
    readonly latitude: number;
    readonly longitude: number;
}
