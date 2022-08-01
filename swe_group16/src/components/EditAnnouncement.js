import { useState, useEffect } from "react";
import { useFirestore } from "reactfire";
// import AnnAuthor from "../components/AnnAuthor";
import { ButtonGroup, Button, Textarea, Box, Input, useToast } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons"

export default function EditAnnouncement({ ann, setIsEditing, user }) {
  const annRef = useFirestore().collection('announcements').doc(ann.id);
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: ann.title,
    body: ann.body,
  });
  const canEdit = (user.id === ann.authorID);

  useEffect(() => {
    setFormData({
      title: ann.title,
      body: ann.body,
    });
  }, [ann]);

  function handleChange(e) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  // Returns true if the user has not made any changes to the announcement.
  function noChangesMade() {
    return (
      formData.title === ann.title &&
      formData.body === ann.body
    )
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    annRef.update(formData)
    .then(updateSuccess)
    .catch(updateError)
    .finally(() => setIsLoading(false));
  }

  function updateSuccess() {
    toast.closeAll();
    toast({
      title: "Announcement updated",
      status: "success",
      position: "top-right",
      isClosable: true,
    });
    // Leave the editing screen
    setIsEditing(false);
  }

  function updateError(error) {
    toast.closeAll();
    toast({
      title: error.code,
      description: error.message,
      status: "error",
      position: "top-right",
      isClosable: true,
    });
  }

  return (
    <Box width="100%">
      <form onSubmit={handleSubmit}>
      <Input
        placeholder="Announcement title"
        name="title"
        type="text"
        value={formData.title}
        mb="1"
        width="100%"
        fontWeight="bold"
        onChange={handleChange}
        isDisabled={isLoading}
        required
      />
      {/*}<AnnAuthor userID={props.announcement.authorID} />*/}
      <Textarea
        name="body"
        mt="3"
        color="gray.600"
        textAlign="justify"
        lineHeight="tall"
        width="100%"
        value={formData.body}
        onChange={handleChange}
        isDisabled={isLoading}
        placeholder="Announcement body"
        required
      />
        <ButtonGroup
          spacing="6"
          mt="3"
          display={canEdit ? "flex" : "none"}
          justifyContent="flex-end"
        >
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
            isDisabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            leftIcon={<CheckIcon />}
            colorScheme="blue"
            isLoading={isLoading}
            isDisabled={noChangesMade()}
            type="submit"
          >
            Save
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
}
