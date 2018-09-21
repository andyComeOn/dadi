<template>
	<div id="app">
		<!-- <loading v-if="$store.state.loading"></loading> -->
		<router-view></router-view>
	</div>
</template>

<script>
export default {
    name: "app",
    data(){
        return {
            _czc : []
        }
    },
    mounted() {
        const script = document.createElement("script");
        script.src =
            "http://s22.cnzz.com/z_stat.php?id=1274834603&web_id=1274834603";
        script.language = "JavaScript";
        document.body.appendChild(script);
        window._czc = [];
        window._czc.push(["_setAccount", "1274834603"]);
    },
    watch: {
        $route() {
            if (window._czc) {
                var location = window.location;
                var contentUrl =
                    location.pathname + location.search + location.hash;
                var refererUrl = "/";
                // _trackEvent
                // _trackPageview
                window._czc.push(["_trackEvent", contentUrl, refererUrl]);
            }
        }
    }
};
</script>

<style>
</style>