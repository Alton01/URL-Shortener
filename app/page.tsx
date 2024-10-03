import UrlShortenerContainer from "@/components/url-shortener-container";

export default function Home() {
  return (
    <main className="flex flex-col mx-auto max-w-2xl py-12 md:py-24 space-y-6 px-4">
      <div className="flex flex-col space-y-4 items-center text-center">
        <h1 className="text-2xl md:text-4xl font-serif">URL SHORTENER APP</h1>
        <p className="text-lg md:text-xl font-serif">
          Shorten your URLs and easily share them!!!
        </p>
      </div>
      <UrlShortenerContainer />
    </main>
  );
}
