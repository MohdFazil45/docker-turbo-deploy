import {prisma} from "@repo/db/client" 
import styles from "./page.module.css";


export default async function Home() {
  const user = await prisma.user.findMany()

  return (
    <div className={styles.page}>
      {JSON.stringify(user)}
    </div>
  );
}

export const revalidate = 60
// export const dynamic = 'force-dynamic'