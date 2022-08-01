import { useState } from "react";
import ViewAnnouncement from "../components/ViewAnnouncement";
import EditAnnouncement from "../components/EditAnnouncement";

export default function Announcement({ announcement, user }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <EditAnnouncement
        ann={announcement}
        setIsEditing={setIsEditing}
        user={user}
      />
    );
  } else {
    return (
      <ViewAnnouncement
        ann={announcement}
        setIsEditing={setIsEditing}
        user={user}
      />
    );
  }
}
