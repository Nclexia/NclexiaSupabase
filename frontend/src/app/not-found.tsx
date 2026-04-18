
import Image from "next/image";


export default function NotFound() {

    return (
        <>
            
            <section className='container p-0'>
                <div className="row g-4 align-items-center">
                    <div className="col-md-6">
                        <h2 style={{ fontSize: "45px !important" }}>Sorry, the page you are trying to view does not exist.</h2>
                    </div>
                    <div className="col-md-6 text-center mt-5">
                        <Image src="/images/error404.png" className="img-fluid" alt="" width={500} height={500} data-aos="zoom-out" data-aos-delay="100" />
                    </div>
                </div>

            </section>

        </>
    );
}
