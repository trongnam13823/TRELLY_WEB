import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChangePassword from "./ChangePassword"
import UpdateInfo from "./UpdateInfo"
import { useNavigate, useParams } from "react-router-dom"

export default function Profile() {
  const { tab } = useParams()
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center mt-10 mx-4">
      <Tabs defaultValue={['info', 'password'].includes(tab) ? tab : 'info'} className="w-[420px]">

        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger className="transition-none" value="info" onClick={() => navigate('/profile/info')}>Information</TabsTrigger>
          <TabsTrigger className="transition-none" value="password" onClick={() => navigate('/profile/password')}>Password</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <UpdateInfo />
        </TabsContent>

        <TabsContent value="password">
          <ChangePassword />
        </TabsContent>

      </Tabs>
    </div>
  )
}