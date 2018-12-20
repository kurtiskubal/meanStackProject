export class Movie {
    public id: string;
    public title: string;
    public releaseDate: string;
    public imagePath: string;

    constructor(id: string, title: string, releaseDate: string, imagePath: string) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.imagePath = imagePath;
    }

}