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
	console.log(videos);
</script>

<div id="main">
	<ul id="circle">
		{#each videos as video}
			<li>
				<iframe
					src="https://www.youtube.com/embed/{video}"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	@use 'sass:math';

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
	}

	#circle li {
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

		$radius: 40vmin;
		//--offset: 0; // css variable to interpolate with animations

		// finds number of total elements
		@for $i from $min through $max {
			&:first-child:nth-last-child(#{$i}),
			&:first-child:nth-last-child(#{$i}) ~ li {
				// finds current number in group of elements
				@for $x from 1 through $i {
					&:nth-child(#{$x}) {
						// spin animation
						@keyframes example-#{$i}-#{$x} {
							0% {
								// set position based on circle
								$angle: $x * math.div(360, $i) + 0deg;
								// rotate and push to radius
								transform: rotate(#{$angle}) translate(#{$radius}) rotate(calc(-1 * #{$angle}));
							}
							100% {
								$angle: $x * math.div(360, $i) + 360deg;
								transform: rotate(#{$angle}) translate(#{$radius}) rotate(calc(-1 * #{$angle}));
							}
						}

						animation-name: example-#{$i}-#{$x};
						animation-duration: #{$speed}s;
						animation-iteration-count: infinite;
						animation-timing-function: linear;
					}
				}
			}
		}
	}
</style>
