// import AnnAuthor from "../components/AnnAuthor";
import { AlertDialogFooter, AlertDialogBody, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, ButtonGroup, Button, Box, Text, useToast, Flex } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { useState, useRef } from "react";
import { useFirestore } from "reactfire";

export default function ViewAnnouncement({ ann, setIsEditing, user }) {
  const annRef = useFirestore().collection('announcements').doc(ann.id);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const closeAlertDialog = () => setShowAlertDialog(false);
  const cancelDeleteRef = useRef();
  const toast = useToast()
  const canDelete = (user.id === ann.authorID);

  function deleteAnnouncement() {
    setIsLoading(true);
    setShowAlertDialog(false);
    annRef.delete()
    .then(deleteSuccess)
    .catch(deleteError)
    .finally(setIsLoading(false));
  }

  function deleteSuccess() {
    toast.closeAll();
    toast({
      title: "Announcement deleted",
      status: "success",
      position: "top-right",
      isClosable: true,
    });
  }

  function deleteError(error) {
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
  <Box>
      <Box>
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" mb="1">{ann.title}</Text>
          <Text
            color="gray.500"
            fontWeight="md"
            fontSize="sm"
          >
            {ann.timestamp}
          </Text>
        </Flex>
        <Text
          color="gray.500"
          fontWeight="md"
          fontSize="sm"
        >{ann.author}</Text>
       <Text
          mt="3"
          color="gray.600"
          textAlign="justify"
          lineHeight="tall"
        >
          {ann.body}
        </Text>
        <ButtonGroup
          spacing="6"
          variant="outline"
          mt="3"
          display={canDelete ? "flex" : "none"}
          justifyContent="flex-end"
        >
          <Button
            leftIcon={<EditIcon />}
            isDisabled={isLoading}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => setShowAlertDialog(true)}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Box>
      <AlertDialog
        isOpen={showAlertDialog}
        leastDestructiveRef={cancelDeleteRef}
        onClose={() => console.log("Close alert dialog")}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader >
              Delete Announcement
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this announcement?
            </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup
              spcing="6"
            >
              <Button
                ref={cancelDeleteRef}
                onClick={closeAlertDialog}>
                Cancel
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                onClick={deleteAnnouncement}
              >
                Delete
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
