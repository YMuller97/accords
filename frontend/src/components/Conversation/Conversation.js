import { useContext, useEffect, useState, useCallback } from "react";
import classes from "./Conversation.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation } from "react-router";
import MessageDisplay from "./MessageDisplay";
import ReportDetails from "./ReportDetails";
import attentionPic from '../../medias/icon-avertissement.avif'

const Conversation = () => {
  // -------------------------------------------------------------- HOOKS -------------------------------------------------------------- //
  const { user, users, admin, isAdmin } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [unresolvedReports, setUnresolvedReports] = useState([]);
  // Hook to access the current location (URL)
  const location = useLocation();

  
  // ------------------------------------------------------------- FUNCTIONS ------------------------------------------------------------- //
  // function to fetch user's conversations
  const fetchConversations = useCallback(async () => { 
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found. User might not be authenticated.");
        return;
      }

      let endpoint = '';
      if (isAdmin && admin) {
        // Fetch admin conversations
        endpoint = `api//conv/admin/${admin.dataValues.id_admin}`;
      } else if (user) {
        // Fetch regular user conversations
        endpoint = `api//conv/user/${user.dataValues.id_user}`;
      }
      const response = await fetch(
        endpoint,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      } else {
        console.error("Erreur lors de la récupération des conversations");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  }, [user, admin, isAdmin]);

  // Function to fetch unresolved reports (Admin only)
  const fetchUnresolvedReports = useCallback(async () => {
    if (isAdmin && admin) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `api//reports/unresolved`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUnresolvedReports(data);
        } else {
          console.error("Erreur lors de la récupération des signalements non résolus");
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  }, [isAdmin, admin]);

  // Function to handle conversation selection
  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    setSelectedReport(null); // Désélectionner le signalement quand on sélectionne une conversation
  };
  
  // Function to handle report selection
  const handleReportSelect = (report) => {
    setSelectedReport(report);
    setSelectedConversation(null); // Désélectionner la conversation quand on sélectionne un signalement
  };

  // Function to handle sending a new message
  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found. User might not be authenticated.");
        return;
      }
      const response = await fetch(
        `api//conv/${selectedConversation.id_conv}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_user: isAdmin ? null : user.dataValues.id_user,
            id_admin: isAdmin ? admin.dataValues.id_admin : null,
            content: messageContent
          }),
        }
      );
      if (response.ok) {
        const updatedConv = await response.json();

        setSelectedConversation(updatedConv);
        setConversations((prevConversations) =>
          prevConversations.map((conv) =>
            conv.id_conv === updatedConv.id_conv ? updatedConv : conv
          )
        );
        setMessageContent("");
      }
    } catch (error) {
      console.error("Erreurs : ", error);
    }
  };

  // Function to create a new admin conversation
  const handleCreateAdminConversation = async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token || !isAdmin || !admin) {
        console.error("Cannot create admin conversation - missing authentication or admin rights");
        return;
      }

      const response = await fetch('api//conv/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          content_conv: {
            messages: [],
            participants: [
              { role: 'admin', id_admin: admin.id_admin },
              { role: 'user', id_user: userId }
            ]
          }
        })
      });

      if (response.ok) {
        const newConversation = await response.json();
        setConversations(prev => [...prev, newConversation]);
        setSelectedConversation(newConversation);
      } else {
        console.error("Erreur lors de la création de la conversation admin");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleResolveReport = (reportId) => {
    setUnresolvedReports(prev => prev.filter(report => report.id_report !== reportId));
  };

  // ------------------------------------------------------------- EFFECTS ------------------------------------------------------------- //
  useEffect(() => {
    if (user) {
      fetchConversations();
    }
    if (isAdmin && admin) {
      fetchConversations();
      fetchUnresolvedReports();
    }
  }, [user, fetchConversations, isAdmin, admin, fetchUnresolvedReports]);

  // Select a conversation based on URL parameters when conversations are loaded
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedId = params.get("selected");

    if (selectedId && conversations.length > 0) {
      const convToSelect = conversations.find(
        (conv) => conv.id_conv.toString() === selectedId
      );
      if (convToSelect) {
        setSelectedConversation(convToSelect);
      }
    }
  }, [conversations, location.search]);

  // ------------------------------------------------------------- RENDERING ------------------------------------------------------------- //
  return (
    <>
      <div className={classes["container"]}>
        {/* Left sidebar - Conversations and Reports */}
        <div className={classes["discussion-container"]}>
          {/* Affichage des signalements non résolus (Admin only) */}
          {isAdmin && admin && (
            <div className={classes["unresolved-reports"]}>
              <span className={classes["discussion-text"]}>Signalements non résolus</span>
              {unresolvedReports.map((report) => (
                <div 
                  key={report.id_report} 
                  className={`${classes["report-item"]} ${selectedReport && selectedReport.id_report === report.id_report ? classes["selected"] : ""}`}
                  onClick={() => handleReportSelect(report)}
                >
                  <p>Report {report.id_report} : {report.type_report}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Conversations list */}
          <span className={classes["discussion-text"]}>Discussions</span>
          <form>
            <input
              className={classes["search-button"]}
              type="text"
              placeholder="Rechercher..."
              name="search"
            />
          </form>
          
          {/* Map through conversations to display them */}
          {conversations.map((conv) => {
            // Find the other participant based on whether the current user is admin or regular user
            const otherParticipant = conv.content_conv.participants.find(
              (p) => {
                if (isAdmin && admin) {
                  return p.role === 'user'; // Admin viewing: show user name
                } else {
                  return p.id_user !== user.dataValues.id_user; // Regular user viewing: show other user's name
                }
              }
            );
            
            let otherUserName = "Utilisateur inconnu";
            let otherUserPicture = "";
            
            if (otherParticipant) {
              if (otherParticipant.role !== 'admin') {
                const otherUser = users.find(
                  (u) => u.id_user === otherParticipant.id_user
                );
                otherUserName = otherUser
                  ? `${otherUser.name_user} ${otherUser.first_name_user}`
                  : `Utilisateur ${otherParticipant.id_user}`;
                otherUserPicture = otherUser.picture_user;
              } else if (otherParticipant.role === 'admin') {
                otherUserName = "Admin";
              }
            }
            
            return (
              <div
                key={conv.id_conv}
                className={`${classes["profile-button"]} ${selectedConversation && selectedConversation.id_conv === conv.id_conv ? classes["selected"] : ""}`}
                onClick={() => handleConversationSelect(conv)}
              >
                <img src={otherParticipant.role === 'admin' ? attentionPic:`api/${otherUserPicture}`} className={classes.picture} alt="user"></img>
                <p>{otherUserName}</p>
              </div>
            );
          })}
        </div>
        
        {/* Right side - Content display area */}
        <div className={classes["profile-container"]}>
          {/* Header with profile image */}
          <div className={classes["image-position"]}>
            <h2>
              {selectedConversation && (
                <span>
                  {/* Display conversation partner name */}
                  {(() => {
                    // Find the other participant based on whether the current user is admin or regular user
                    const otherParticipant = selectedConversation.content_conv.participants.find(
                      (p) => {
                        if (isAdmin && admin) {
                          return p.role === 'user'; // Admin viewing: show user name
                        } else {
                          return p.id_user !== user.dataValues.id_user; // Regular user viewing: show other user's name
                        }
                      }
                    );
                    
                    let otherUserName = "Utilisateur inconnu";
                    
                    if (otherParticipant) {
                      if (otherParticipant.role !== 'admin') {
                        const otherUser = users.find(
                          (u) => u.id_user === otherParticipant.id_user
                        );
                        otherUserName = otherUser
                          ? `${otherUser.name_user} ${otherUser.first_name_user}`
                          : `Utilisateur ${otherParticipant.id_user}`;
                      } else if (otherParticipant.role === 'admin') {
                        otherUserName = "Admin";
                      }
                    }
                    
                    return otherUserName;
                  })()}
                </span>
              )}
              {selectedReport && (
                <span>Signalement #{selectedReport.id_report}</span>
              )}
            </h2>
          </div>
          
          <hr />
          
          {/* Content area */}
          <div className={classes["profile-conversation"]}>
            {/* Show message display component when conversation is selected */}
            {selectedConversation && (
              <MessageDisplay 
                conversation={selectedConversation}
                isAdmin={isAdmin}
                adminId={admin ? admin.id_admin : null}
                userId={user ? user.dataValues.id_user : null}
              />
            )}
            
            {/* Show report details component when report is selected */}
            {selectedReport && (
              <ReportDetails 
                report={selectedReport}
                onResolve={handleResolveReport}
                onContactUser={isAdmin && admin ? handleCreateAdminConversation : null}
              />
            )}
            
            {/* Show prompt when nothing is selected */}
            {!selectedConversation && !selectedReport && (
              <p>Veuillez sélectionner une conversation ou un signalement</p>
            )}
          </div>
          
          {/* Message input form - only show when conversation is selected */}
          {selectedConversation && (
            <form
              onSubmit={handleSubmitMessage}
              className={classes["message-form"]}
            >
              <input
                className={classes["message-button"]}
                type="text"
                placeholder="Aa.."
                name="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
              <button type="submit" className={classes["send-button"]} />
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Conversation;