export class MFile {
	originalname: string;
	buffer: Buffer;

	public constructor(file: Express.Multer.File | MFile) {
		this.buffer = file.buffer;
		this.originalname = file.originalname;
	}
}
