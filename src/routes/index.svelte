<script context="module">
	export const load = async ({ fetch }) => {
		const videos = await fetch('/api/azlef.json');
		const jsonVideos = await videos.json();

		return {
			props: {
				videos: jsonVideos
			}
		};
	};
</script>

<script>
	export let videos = [];
</script>

<div id="background">
	<iframe
		src="https://www.youtube.com/embed/0jxUZxQBvb8?autoplay=1&mute=1&loop=1"
		title="YouTube video player"
	/>
</div>
<div id="main">
	<ul id="circle">
		{#each videos as video, i}
			<li style="--total-count: {videos.length}; --current:{i}">
				<iframe
					src="https://www.youtube.com/embed/{video}"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				/>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	@use 'sass:math';

	:global(body) {
		padding: 0;
		margin: 0;
		overflow: hidden;
	}

	#background {
		position: fixed;
		width: 120%;
		height: 120%;
		left: -10%;
		top: -10%;
		iframe {
			width: 100%;
			height: 100%;
		}
	}

	#main {
		width: 100vw;
		height: 100vh;
		display: grid;
		place-content: center;
		position: absolute;
	}

	#circle {
		position: relative;
		background-color: red;
		li {
			display: grid;
			place-content: center;
			position: fixed;
			width: 0px;
			height: 0px;

			iframe {
				// original dimensions: 560 x 315
				width: 40vmin;
				height: 22.5vmin;
			}

			@property --offset {
				syntax: '<angle>';
				inherits: true;
				initial-value: 0deg;
			}

			$min: 1;
			$max: 18; // max number to generate angles for (kind of hacky)
			$speed: 10; // in seconds

			$radius: 30vmin;

			//--offset: 0; // css variable to interpolate with animations
			--offset: calc(360deg / var(--total-count) * var(--current));

			// set position based on circle
			--angle: calc(var(--offset) + 0deg);
			// set position based on circle
			--angle2: calc(var(--offset) + 360deg);

			// spin animation
			@keyframes spin {
				0% {
					// rotate and push to radius
					transform: rotate(var(--angle)) translate(#{$radius}) rotate(calc(-1 * var(--angle)));
				}
				100% {
					// rotate and push to radius
					transform: rotate(var(--angle2)) translate(#{$radius}) rotate(calc(-1 * var(--angle2)));
				}
			}

			animation-name: spin;
			animation-duration: #{$speed}s;
			animation-iteration-count: infinite;
			animation-timing-function: linear;

			&:nth-child(even) {
				animation-direction: reverse;
			}

			&:hover {
				animation-play-state: paused;
			}
		}
	}
</style>
