import { Header } from "@/lib"
import { InformationSection, IntroSection, CourseSection } from './screens'

export const PublicHome = () => {

    return (
        <div className="bg-common-grey relative overflow-hidden">
            <Header />
            <IntroSection />
            <InformationSection />
            <CourseSection />
        </div>
    )
}
