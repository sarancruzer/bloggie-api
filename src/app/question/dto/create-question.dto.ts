import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Category } from "../entities/category.entity";


export class CreateQuestionDto {

    
    @IsNotEmpty()
    category: string;

    
    @IsNotEmpty()
    question: string;
    
    description: string;

}



@Exclude()
export class QuestionListDto {    
    
    @Expose()
    id: string;
    
    @Expose()
    question: string;
    
    @Expose()
    description: string;   
    
    @Expose()
    @Type(() => CategoryDto)
    category: CategoryDto[];

}

@Exclude()
export class CategoryDto {     
    
    @Expose()
    id: string;   
    
    @Expose()
    categoryName: string;   

    @Expose()
    @Type(() => QuestionListDto)
    question: QuestionListDto[];
}