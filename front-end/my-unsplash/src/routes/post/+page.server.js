import { redirect } from "@sveltejs/kit";
import { user, isLoggedIn } from "../../lib/stores";








export const load= async () =>{

}


export const actions= {
    default: async ({request}) => {
        const formData= await request.formData();

      


       
        //formData.append('user', $store);

        fetch('http://localhost:4000/api/post/createPost', {
              method: 'POST',
              body: formData
        })
        console.log(formData);
        throw  redirect(303, '/');
    }
}



