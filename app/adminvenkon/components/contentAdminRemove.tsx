"use client";

import { deleteBlock, getRevalidate } from "@/services/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ContentAdminRemoveProps {
  blockId: number;
  pageId: number;
}

export default function ContentAdminRemove({
  blockId,
  pageId
}: ContentAdminRemoveProps) {
  const [isDelete, setIsDelete] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    deleteBlock(blockId);
    getRevalidate(pageId === 2 ? "/ru" : "/ru/whyvenkoncommunications");
    getRevalidate(pageId === 2 ? "/en" : "/en/whyvenkoncommunications");
    getRevalidate(pageId === 2 ? "/uz" : "/uz/whyvenkoncommunications");
    router.push("/adminvenkon");
  };

  return (
    <div style={{ color: "red", fontWeight: "500", margin: "10px 0px" }}>
      {isDelete ? (
        <div>
          <div>
            Вы уверены что хотите удалить блок? Это действие необратимое.
          </div>
          <div>
            <button
              style={{
                color: "red",
                fontWeight: "500",
                padding: "1%",
                margin: "5px 0px",
              }}
              onClick={handleDelete}
            >
              Да, удалить блок безвозвратно
            </button>
          </div>
          <div>
            <button onClick={() => setIsDelete(false)}>Нет, назад</button>
          </div>
        </div>
      ) : (
        <button style={{ color: "red" }} onClick={() => setIsDelete(true)}>
          Удалить этот блок
        </button>
      )}
    </div>
  );
}
