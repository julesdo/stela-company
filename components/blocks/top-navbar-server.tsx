import client from "@/tina/__generated__/client"
import TopNavbar from "./top-navbar"

export default async function TopNavbarServer() {
  let tinaNav: Array<{ href: string; label?: string | null }> | null = null
  try {
    const result = await client.queries.global({ relativePath: "index.json" })
    const nav = result?.data?.global?.header?.nav
    if (nav) {
      tinaNav = nav
        .filter((item): item is NonNullable<typeof item> => !!item?.href)
        .map((item) => ({ href: item!.href!, label: item!.label }))
    }
  } catch {}
  return <TopNavbar tinaNav={tinaNav} />
}
