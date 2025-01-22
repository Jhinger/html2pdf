export default function Footer() {
  return (
    <footer class="w-full h-fit py-12 flex flex-row justify-center items-start gap-12">
      <div class="flex flex-row gap-2 justify-start items-center">
        <svg
          width="35"
          height="18"
          viewBox="0 0 35 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M33.4012 3.04785C26.7799 15.1173 13.5532 20.0242 1.26836 13.2294C0.859398 13.0031 0.340787 13.1446 0.109978 13.5406C-0.12083 13.9436 0.0234407 14.4526 0.432405 14.6789C13.6 21.9687 27.8012 16.7718 34.8986 3.83975C35.1208 3.43673 34.9657 2.92758 34.5524 2.70839C34.1391 2.49628 33.6234 2.64483 33.4012 3.04785Z"
            fill="black"
          />
          <path
            d="M11.6064 8.053C12.9741 8.053 14.0829 6.9661 14.0829 5.62531C14.0829 4.28453 12.9741 3.19763 11.6064 3.19763C10.2386 3.19763 9.12988 4.28453 9.12988 5.62531C9.12988 6.9661 10.2386 8.053 11.6064 8.053Z"
            fill="black"
          />
          <path
            d="M21.8588 5.47055C23.1998 5.47055 24.2869 4.4049 24.2869 3.09032C24.2869 1.77574 23.1998 0.710083 21.8588 0.710083C20.5178 0.710083 19.4307 1.77574 19.4307 3.09032C19.4307 4.4049 20.5178 5.47055 21.8588 5.47055Z"
            fill="black"
          />
        </svg>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
      <div class="flex flex-col justify-center gap-2 items-start">
        <span class="font-medium text-base mb-2">Company</span>
        <span class="font-normal text-sm">Contact</span>
        <span class="font-normal text-sm">Terms of Service</span>
        <span class="font-normal text-sm">Privacy Policy</span>
        <span class="font-normal text-sm">GDPR</span>
      </div>
      <div class="flex flex-col justify-center gap-2 items-start">
        <span class="font-medium text-base mb-2">Product</span>
        <span class="font-normal text-sm">Features</span>
        <span class="font-normal text-sm">Documentation</span>
        <span class="font-normal text-sm">Pricing</span>
      </div>
    </footer>
  );
}
