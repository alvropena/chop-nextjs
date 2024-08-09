
import { SidebarRoutes } from '@/components/sidebar/sidebar-routes'

const SidebarPage = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto shadow-sm">
      <div className="p-6">Chop</div>
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
}

export default SidebarPage
