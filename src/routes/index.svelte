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

<script lang="ts">
	export let videos: string[] = [];
</script>

<div id="background">
	<iframe
		src="https://www.youtube.com/embed/0jxUZxQBvb8?autoplay=1&mute=1&loop=1&&controls=0"
		title="YouTube video player"
	/>
</div>
<div id="main">
	<div id="center">
		{#each videos as video, i}
			<div style="--total-count: {videos.length}; --current:{i}">
				<div class="clip-circle">
					<iframe
						class="video"
						src="https://www.youtube.com/embed/{video}?controls=0"
						title="YouTube video player"
					/>
				</div>
			</div>
		{/each}
	</div>
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
		width: 100vw;
		height: 100vh;
		left: 50%;
		top: 50%;
		iframe {
			display: block;
			position: absolute;
			transform: translate(-50%, -50%);
			min-width: 100vw;
			min-height: 100vh;
			aspect-ratio: 16 / 9;
		}
	}

	#main {
		width: 100vw;
		height: 100vh;
		display: grid;
		place-content: center;
		position: absolute;
	}

	#center {
		position: relative;
		background-color: red;
		height: 0;
		margin: 0;

		> * {
			display: grid;
			place-content: center;
			position: fixed;
			width: 0;
			height: 0;

			.clip-circle {
				width: 20vmin;
				height: 20vmin;
				overflow: hidden;
				border-radius: 100%;
			}

			iframe {
				// original dimensions: 560 x 315
				width: 40vmin;
				height: 22.5vmin;
				// center
				margin-left: -10vmin;
				margin-top: -2vmin;
			}

			@property --offset {
				syntax: '<angle>';
				inherits: true;
				initial-value: 0deg;
			}

			$min: 1;
			$max: 18; // max number to generate angles for (kind of hacky)
			$speed: 5; // in seconds

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

			transform-origin: center;
			animation-name: spin;
			animation-duration: #{$speed}s;
			animation-iteration-count: infinite;
			animation-timing-function: linear;

			&:nth-child(even) {
				animation-direction: reverse;
			}

			&:hover {
				animation-play-state: paused;
				animation-direction: 0s;
				z-index: 999 !important;
			}
		}
	}
</style>
