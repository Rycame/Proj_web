import { ApiProperty } from "@nestjs/swagger";
import { Member } from "./association.member";

export class AssociationDTO {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: "Computer Science Club" })
    name: string;

    @ApiProperty({ type: [Member] })
    members: Member[];
}
