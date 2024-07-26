"use client";

import { deleteBlock } from "@/services/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../styles/AuthAdmin.module.scss";

interface ContentAdminRemoveProps {
  blockId: number;
  pageId: number;
}

export default function ContentAdminRemove({
  blockId,
  pageId,
}: ContentAdminRemoveProps) {
  const [isDelete, setIsDelete] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    deleteBlock(blockId);
    router.push("/adminvenkon");
  };

  return (
    <div>
      {isDelete ? (
        <div className={styles.admin__wrapper__change}>
          <div>
            Вы уверены что хотите удалить блок? Это действие необратимое.
          </div>
          <div>
            <button className={styles.removeBtn} onClick={handleDelete}>
              Да, удалить блок безвозвратно
            </button>
          </div>
          <div>
            <button
              className={styles.backBtn}
              onClick={() => setIsDelete(false)}
            >
              Нет, назад
            </button>
          </div>
        </div>
      ) : (
        <button className={styles.removeBtn} onClick={() => setIsDelete(true)}>
          Удалить этот блок
        </button>
      )}
    </div>
  );
}
