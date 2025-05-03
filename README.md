# Masonry Grid in React JS

This is a performance-optimized photo gallery built using React, TypeScript, and the Pexels API. It features a fully responsive, virtualized masonry grid and supports smooth transitions to detailed photo views. The app is built from the ground up without external layout libraries and emphasizes bundle size, UX performance, and strong typing.


## Key Features

- Responsive, virtualized masonry grid using **custom layout logic** (no external libraries)
- The masonry grid is virtualised to display photos in user's scrolling window
- The application is Strongly typed including separate types for api response and application DTO
- Optimized image loading
- The images layed out in masonry format are fetched from Pexels api
- Optimized bundle with **code splitting**, **Brotli compression**, and **manual chunking**


## Steps to run

1. Install the dependencies using
`npm install`
2. Run the application in dev mode
`npm run dev`
3. Generate production build (optional) `npm run build`
4. Run the unit test suite (optional) `npm run test`

## Technical features explaination

####  Layout calculation
On page load the layout of masonry grid gets calculated based on the container width the in which the layout loads. During this calculation the layout container is relatively positioned and each photo inside the grid is absolutely positioned and placed by calculating the exact the top and left in pixels relative to the container. These numbers get recaulated with changes in screen dimensions (container width, viewport height), photos and during user scroll. This logic is generically typed, reusable, maintainable and is separated from UI layer in custom hook `useCalculateMasonryGridLayout`

### Virtualization
The virtualization is implemented by creating a sliding window based on viewport height and scroll offset, photos are filtered during user scrolls based on if they fall within the sliding window, this filtering happens everytime user scrolls

### Error Handling
The app uses custom error boundaries to catch and gracefully handle unexpected runtime errors. Each route (Gallery and Photo Detail) is wrapped in an error boundary, ensuring the app remains stable even if individual views fail to load or render.

### Optimization

This application uses multiple techniques for optimizing performance and smooth user experience, following are the categorized details: 

- #### Caching 
    The layout calculations are cached between re-renders using `useMemo` react hook. These layout calculations are also cached in memory to only re-calculate the position of photos for new photos entering the sliding window on scroll.
- ### Minimize void gaps in grid
    While user scrolls and more photos get loaded, a photo gets qualified to make in the sliding window if 50% of the photo enters the sliding window, this number is configurable via `PHOTO_VISIBLE_RATIO` constant in config.

    To avoid display of empty white space in the grid the number of images fetched are calculated as per the container width. This ensures the grid uses available space efficiently.
- ### Smooth Scrolling
    The users current scroll position is stored in component local state, to ensure the scrolling feels "smooth", the on scroll event handler is throttled by 100ms, which implies that when user scrolls the scroll position will get updated in state ~10 times per second (max).

    Since changes in scroll position drives the layout and photo filtering in sliding window, throttling this way minimizes the re-renders. Furthermore the scroll value is stored and accessed from `ref` instead of state to make sure real time values are used in calculation without causing unnecessary re-renders.

    When user scrolls to near bottom of the page (or viewport height) the api call is fired to fetch the next page, in order to avoid spamming multiple api calls the function is debounced by 300ms. Furthermore the api call function is received as a prop to the grid, in order to make sure component uses the latest function without unnecessary re-renders the function is stored in a ref.

- ### Image optimization
    - The layout calculation logic also calculates the exact width and height for each image to be rendered in masonry grid and also builds the image url using these numbers to make sure images with correct height is rendered based on container width. 
    - The image src is further used to generate correct `srcSet` for browsers to choose optimal image size. 
    - The image used in photo details page has high fetch priority set and is loaded eagerly.
    - All the images in the application uses a solid average color of the image to show a loading state and once the image is available the solid color smoothly transitions into the image.
    - Images have set decoding async so that browser gets to focus on rendering instead of waiting to decode images syncronously

- ### Bundle size
    Following are some strategies used for bundle optimisation: 
    - Routes in the app are lazy loaded to make sure separate bundle is created for each page. 
    - Brotli compression is used for JS files
    - Manual chunking for `react-router-dom` is done since this is a shared bundle between all routes, this helps keeping the application bundle pure and small, also enables browsers to cache react-router bundle for re-use in multiple lazy loaded routes
    - Babel plugin is used reduce the bundle size of styled component by tree shaking unused styles, it also adds component names for better debugging.

- ### Preloads
    - When user hovers on an image in the grid the photo detail route bundle is preloaded to for fast route transition and is cached by the browser, this helps us reduce the transition time between pages, same feature is implemented from details page to gallery


## Design decisions
- The decision of calculating the layout and positioning each image in the grid instead of using a css solution to render the grid was taken so that app has more control on each image to implement more controled virtualisation. By knowing the exact size and position of each image before rendering the app has 0 CLS

## Possible improvements
- The application currently uses client side rendering, we can gain performance benefits by loading the initial page on server side, that also would give us opportunity to preload the images in initial document.
- Styled components bundle can be further fine-tuned to reduce the contribution of styled components in final bundle size, moreover alternative CSS in JS solutions could also give us same feature in less bundle size.
- When user navigates back to gallery from details page we can restore the calculations and scroll state so that user can continue their experience from exact same spot.
- The calculations are cached in memory storing id -> Photo with layout attributes. This can be further improved by adding a cache key (default-grid, search-{query_param}), so that the cache can be re-used for multiple contexts such as search results (in future, when we implement it).
- For debounce and throttle we are using lodash, if we add custom utility functions instead, it will help remove lodash from the bundle, resulting in even smaller size.