import { ApiProperty } from "@nestjs/swagger";

export class Member {
    @ApiProperty({ example: 1 })
    userId: number;

    @ApiProperty({ example: "John" })
    firstname: string;

    @ApiProperty({ example: "Doe" })
    lastname: string;

    @ApiProperty({ example: "President" })
    role: string;
}
