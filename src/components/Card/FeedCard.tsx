import Image from 'next/image';


export default function FeedCard() {
  return (
    <div className="text-black border rounded-[8px] px-4 py-6 flex flex-col-2 gap-2 w-[680px] h-[232px]">


      <div>
        <Image
          src="/Whiskers.jpg"
          width={60}
          height={60}
          alt="Picture of the author"
          className="w-[60px] h-[60px] rounded-full object-cover"
        />
      </div>
      <div className="grid grid-row-4 gap-2 w-[580px] h-[184px]">
        <div className="flex">
          <p className="text-body-bold">Anntonia Porsid</p>
          <p className="text-soft-gray">&nbsp;&#x2022;&nbsp;3 Day left</p>
        </div>

        <div className="flex gap-2 items-center">

          <p className="text-bright-blue text-subheading2">
            Whisker & Buddy outing
          </p>
          
          <div className="flex gap-2">
            {/* Wrapper for border styling */}
            <div className="rounded-full border-4 border-bright-blue p-[2px]">
              <Image
                src="/Whiskers.jpg"
                width={40}
                height={40}
                alt="Picture of the author"
                className="rounded-full w-[40px] h-[40px] object-cover"
              />
            </div>

            <div className="rounded-full border-4 border-bright-blue p-[2px]">
              <Image
                src="/Whiskers.jpg"
                width={40}
                height={40}
                alt="Picture of the author"
                className="rounded-full w-[40px] h-[40px] object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex clex-col-2 gap-8">
          <div>
            <p className="text-body-bold">Start</p>
            <p>December 31, 2024 at 7:00 am</p>
          </div>

          <div>
            <p className="text-body-bold">End</p>
            <p>December 31, 2024 at 6:00 pm</p>
          </div>
        </div>
        <hr />
        <div className="flex pt-3">
          <Image
            src="/location.svg"
            width={24}
            height={24}
            alt="Location icon"
          />
          <p>KMITL ECC Building &nbsp;</p>
          <p className="text-soft-gray">(5.4&nbsp;km)</p>
        </div>
      </div>
    </div>
  );
}