import { Therapist } from "src/app/therapist/entities/therapist.entity";
import { ITherapist } from "src/app/therapist/interface/therapist.interface";
import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm/connection/Connection";

export default class CreateTherapists implements Seeder {
    therapist: ITherapist[] =  [
        {
            firstName: "Rekha",
            lastName:"Rajmohan",
            email:"saraseed1@yopmail.com",
            mobileNumber: '9597009544',
            education: 'BDS',
            specialist: 'Dental Surgeon, Preventive Dentistry, Cosmetic/Aesthetic Dentist',
            experience: '12 Years Experience Overall  (12 years as specialist)',
            about: 'Dr. Rekha Rajmohan is a 2003 graduate from Dr.MGR Medical university. She has been practicing dentistry full time as a cosmetic dentist in Thanjavur,Tamilnadu since her graduation. She has done her fellowship in Dental lasers in Sri Ramchandra Dental College,chennai. She is in charge of Thanjai Dental Centre functioning in Rohini Hospitals & MR Hospitals, Near Mani Mandapam, Thanjavur. Along with the chief Dentist and Implantologist Dr Rajmohan,She renders all latest dental treatment in a cost effective manner. She always maintains the highest levels of accreditation and pursue ongoing education to stay abreast of the latest trends in dentistry.. She performs laser dental treatments providing high quality dental care in thanjavur',
            location: 'Thanjavur'
        },
        {
            firstName: "J S Narrenthran",
            lastName:"",
            email:"saraseed2@yopmail.com",
            mobileNumber: '9597009544',
            education: 'MDS - Paedodontics And Preventive Dentistry, BDS',
            specialist: 'Dental Surgeon, Preventive Dentistry, Cosmetic/Aesthetic Dentist',
            experience: '12 Years Experience Overall  (12 years as specialist)',
            about: 'Dr. JS Narrenthran Experienced Head with a demonstrated history of working in the medical practice industry. Skilled in Cosmetic Dentistry, Dentistry, Healthcare, Restorative Dentistry, and Pediatric Dentistry. Strong professional with a MDS focused in Dentistry from Sri Ramachandra Medical College and Research Institute.He has done his specialization in Pediatric Dentistry. He practices at avadi and also works as consultant Pediatric Dentist at private hospitals and clinics. He has been awarded gold medal during his master',
            location: 'Thanjavur'
        },
        {
            firstName: "Mohamed",
            lastName:"Rafeek ",
            email:"saraseed1@yopmail.com",
            mobileNumber: '9597009544',
            education: 'MD - Dermatology , Venereology & Leprosy',
            specialist: 'Aesthetic Dermatologist',
            experience: '4 Years Experience Overall  (4 years as specialist)',
            about: 'Dr. Mohamed Rafeek N is a Aesthetic Dermatologist in Pattukottai, Thanjavur and has an experience of 4 years in this field. Dr. Mohamed Rafeek N practices at Dermacare Skin Clinic in Pattukottai, Thanjavur. He completed MD - Dermatology , Venereology & Leprosy from Sri Manakula Vinayagar Medical College & Hospital in 2017',
            location: 'Thanjavur'
        },
        {
            firstName: "Mohamed",
            lastName:"Rafeeek",
            email:"saraseed1@yopmail.com",
            mobileNumber: '9597009544',
            education: 'BDS',
            specialist: 'Dental Surgeon, Preventive Dentistry, Cosmetic/Aesthetic Dentist',
            experience: '12 Years Experience Overall  (12 years as specialist)',
            about: 'Dr. Rekha Rajmohan is a 2003 graduate from Dr.MGR Medical university. She has been practicing dentistry full time as a cosmetic dentist in Thanjavur,Tamilnadu since her graduation. She has done her fellowship in Dental lasers in Sri Ramchandra Dental College,chennai. She is in charge of Thanjai Dental Centre functioning in Rohini Hospitals & MR Hospitals, Near Mani Mandapam, Thanjavur. Along with the chief Dentist and Implantologist Dr Rajmohan,She renders all latest dental treatment in a cost effective manner. She always maintains the highest levels of accreditation and pursue ongoing education to stay abreast of the latest trends in dentistry.. She performs laser dental treatments providing high quality dental care in thanjavur',
            location: 'Thanjavur'
        },
        {
            firstName: "Suresh",
            lastName:"Srinivasan",
            email:"saraseed1@yopmail.com",
            mobileNumber: '9597009544',
            education: 'BDS',
            specialist: 'Dental Surgeon, Preventive Dentistry, Cosmetic/Aesthetic Dentist',
            experience: '12 Years Experience Overall  (12 years as specialist)',
            about: 'Dr. Rekha Rajmohan is a 2003 graduate from Dr.MGR Medical university. She has been practicing dentistry full time as a cosmetic dentist in Thanjavur,Tamilnadu since her graduation. She has done her fellowship in Dental lasers in Sri Ramchandra Dental College,chennai. She is in charge of Thanjai Dental Centre functioning in Rohini Hospitals & MR Hospitals, Near Mani Mandapam, Thanjavur. Along with the chief Dentist and Implantologist Dr Rajmohan,She renders all latest dental treatment in a cost effective manner. She always maintains the highest levels of accreditation and pursue ongoing education to stay abreast of the latest trends in dentistry.. She performs laser dental treatments providing high quality dental care in thanjavur',
            location: 'Thanjavur'
        },
        
        
    ];

    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
        .createQueryBuilder()
        .insert()
        .into(Therapist)
        .values(this.therapist)
        .execute()
    }
  }