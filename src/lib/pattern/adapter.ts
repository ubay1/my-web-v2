export interface KatalogAdapter {
	getTitleAndAuthor(): string;
}

export class BookKatalogAdapter {
	private book: Book;

	constructor(book: Book) {
		this.book = book;
	}

	getTitleAndAuthor(): string {
		return this.book.title + ' by ' + this.book.author;
	}
}

export class Book {
	constructor(public title: string, public author: string) {}

	public getBook(): string {
		return `buku ${this.title}, dibuat oleh ${this.author}`;
	}
}

export class MovieKatalogAdapter {
	private movie: Movie;

	constructor(movie: Movie) {
		this.movie = movie;
	}

	getTitleAndAuthor(): string {
		return this.movie.title + ' by ' + this.movie.author;
	}
}
export class Movie {
	constructor(public title: string, public author: string, public duration: number) {}

	public getMovie(): string {
		return `film ${this.title}, dibuat oleh ${this.author} dalam durasi ${this.duration} menit`;
	}
}
