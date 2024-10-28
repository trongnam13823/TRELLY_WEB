import nprogress from "nprogress";

nprogress.configure({
  showSpinner: false,
  template:`
    <div role="bar"></div>
    <div
      class="animate-slide-in-from-top fixed z-50 top-0 left-0 h-[300px] w-full transition-all duration-300 pointer-events-none dark:h-[200px] dark:!bg-white/10 dark:rounded-[100%] delay-0 opacity-1 -translate-y-1/2"
      style="background: radial-gradient(closest-side, rgba(0, 10, 40, 0.2) 0%, rgba(0, 0, 0, 0) 100%);">

      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[30px] p-2 bg-white/80 dark:bg-gray-800 rounded-lg shadow-lg">
        <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" class="text-3xl animate-spin"
          height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd"
            d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="currentColor"></path>
          <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
  `,
})

export default nprogress;
