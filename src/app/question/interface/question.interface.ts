import { ResponseDto } from "src/app/shared/dto/response.dto";
import { CreateQuestionDto } from "../dto/create-question.dto";

export const QUESTION_SERVICE = 'QUESTION SERVICE';

export interface IQuestionService {

    create(createQuestionDto: CreateQuestionDto): Promise<ResponseDto>

    findAll(): Promise<any>;

    findOne(id: string);
}
