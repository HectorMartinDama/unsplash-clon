import { error } from '@sveltejs/kit';
import { getPicturesCategory } from '../../servicies/imageService';


export const load= async({ params }) =>{
    const { posts, totalPages, currentPage } = await getPicturesCategory(params.category);
    if(posts.length === 0) throw new error(404, 'No posts found');
    return { posts, totalPages, currentPage}
}