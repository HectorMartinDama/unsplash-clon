<script>
    export let data;
    import Nav from "../../components/nav.svelte";
    import Galery from "../../components/galery.svelte";
</script>


<Nav></Nav>
<section class="main-labels"></section>

<Galery pictures={data}/>
