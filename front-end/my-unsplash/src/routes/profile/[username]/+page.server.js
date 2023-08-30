import { error } from '@sveltejs/kit';
import { getInfoUser } from '../../../servicies/imageService';

export const load= async({ params }) =>{
        const infoUser= await getInfoUser(params.username)
        console.log(infoUser)
        return { infoUser };
}