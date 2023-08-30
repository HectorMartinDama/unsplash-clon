import { getPictures } from '../servicies/imageService';


export const load= async() =>{
    const { posts, totalPages, currentPage } = await getPictures();
    return { posts, totalPages, currentPage }
}