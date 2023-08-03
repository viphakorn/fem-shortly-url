// import "./style.css"

const menuButton = document.querySelector<HTMLButtonElement>("#menu-button");
const menuNavigation =
  document.querySelector<HTMLDivElement>("#menu-navigation");

menuButton?.addEventListener(
  "click",
  () => menuNavigation?.classList.toggle("hidden"),
);

interface ShortenResponse {
  ok: boolean;
  result: Shorten;
}
interface Shorten {
  code: string;
  short_link: string;
  full_short_link: string;
  short_link2: string;
  full_short_link2: string;
  share_link: string;
  full_share_link: string;
  original_link: string;
}

const form = document.querySelector<HTMLFormElement>("#shorten-form");
const input = document.querySelector<HTMLInputElement>("#shorten-input");
const warning = document.querySelector<HTMLDivElement>("#shorten-warning");
const result = document.querySelector<HTMLDivElement>("#shorten-result");

form?.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the form from submitting normally
  const url = input?.value || "";
  if (input) {
    input.value = "";
  }
  if (!isUrlValid(url)) {
    input?.classList.add(
      "ring-[3px]",
      "ring-secondary-red",
      "placeholder:text-secondary-red/50",
    );
    warning?.classList.remove("hidden");

    return;
  }
  const shorten = (await getShortenUrl(url)).result;
  if (result) {
    warning?.classList.add("hidden");
    input?.classList.remove(
      "ring-[3px]",
      "ring-secondary-red",
      "placeholder:text-secondary-red/50",
    );
    result.innerHTML += `
    <div div class="flex flex-col lg:flex-row justify-between items-center rounded-md bg-white mt-4 py-4 px-8 lg:gap-6">
      <a href="${shorten.original_link}" class="p-4 lg:p-0" target="_blank"
        >${shorten.original_link}</a
      >
      <hr class="border-neutral-gray lg:hidden" />
      <a href="${shorten.full_short_link}" class="p-4 lg:p-0 text-primary-cyan lg:ml-auto"
        >${shorten.full_short_link}</a
      >
      <button

      data-url="${shorten.full_short_link}"
        class="mx-4 mb-4 lg:m-0 px-7 inline-flex justify-center rounded bg-primary-cyan py-2 font-bold text-white hover:bg-primary-light-cyan"
      >
        Copy
      </button>
    </div>`;
    const copyButtons = result?.querySelectorAll<HTMLButtonElement>("button");

    copyButtons?.forEach((button) => {
      button.addEventListener("click", async () => {
        await copyUrl(button);
      });
    });
  }
});

async function getShortenUrl(url: string) {
  try {
    const res = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`,
    );
    if (!res.ok) throw new Error(res.statusText);
    const data = (await res.json()) as ShortenResponse;
    return data;
  } catch (error) {
    throw error;
  }
}
function isUrlValid(url: string): boolean {
  // A simple regex to check if the URL is valid
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}
async function copyUrl(element: HTMLElement) {
  try {
    element.innerText = "Copied";
    element.classList.remove("bg-primary-cyan", "hover:bg-primary-light-cyan");
    element.classList.add("bg-primary-dark-violet");
    await navigator.clipboard.writeText(element.dataset?.url || "");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
