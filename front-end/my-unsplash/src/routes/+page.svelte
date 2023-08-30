<script>
    export let data;
    import Galery from '../components/galery.svelte';
    import Nav from '../components/nav.svelte';



</script>



<Nav></Nav>


<section class="main-labels">

</section>


<Galery pictures={data}/>



<style global>

    .main-labels{
        height: 590px;
    }

    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500&display=swap');

    *{
        font-family: 'Noto Sans', sans-serif;
    }


    #load-more{
        height: 35px;
        margin-top: 400px;
    }




   

</style>

