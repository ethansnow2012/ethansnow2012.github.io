import React, {
  useContext,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { globalContext } from "App";
import { firebaseEndpoints } from "service/firebaseEndpoints";
import {
  WithContextFactory,
  WithContextWithForwardRefFactory,
} from "hoc/factory/WithContext";
import { SplitContext } from "hoc/factory/RootPageHoc";
import { storeMainContent } from "service/data";
import { RainScene } from "components";

let TARGET_COLLECTION = process.env.REACT_APP_TARGET_COLLECTION;
let TEST_MODE = process.env.REACT_APP_TEST_MODE;
//TARGET_COLLECTION = 'alpha_github_page_data_root'

const StyledFloating = styled.div`
  z-index: 90000;
  position: fixed;
  right: 0;
  top: 0;
  mix-blend-mode: exclusion;
  .control {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .control .btn {
    display: flex;
    width: max-content;
    padding: 5px 8px;
    cursor: pointer;
  }
  .control .btn.default-hide {
    display: none;
  }
  .control .btn.default-hide.active {
    display: flex;
  }

  .control .btn-spinner {
    opacity: 0;
    width: max-content;
    height: max-content;
    margin-right: 3px;
    animation: lds-dual-ring 1.2s linear infinite;
    transition: opacity 1s ease;
  }

  .control .btn-spinner.active {
    opacity: 1;
  }

  @keyframes lds-dual-ring {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Styled = styled.div`
  position: relative;
  height: 70vh;
  color: white;
  background-color: var(--color-blue-visual-weight);
  justify-content: center;
  display: flex;
  flex-direction: column;
  justify-content: end;
}
`;

export function HeaderFloating({ fromParentArgs, portalTarget }) {
  const {
    rightContentRef,
    isLoggedIn,
    setIsLoggedIn,
    isSaving,
    isEditing,
    signOut,
    logIn,
    clickSaveContentPage,
    currentSplitLoc,
    toggleEditMode,
    mainPageSave,
  } = fromParentArgs;
  return ReactDom.createPortal(
    <StyledFloating>
      <div className="control">
        {
          // In test mode expose the click function to expose inner state and function
          TEST_MODE == "TRUE" ? (
            <div
              className="btn btn-test-login"
              onClick={() => {
                // test: trigger the LoggedIn SideEffect without actual firebase utils
                setIsLoggedIn(true);
                const [contentPageIsEditing, setContentIsEditing] =
                  rightContentRef.current.innerStates._isEditing;
                setContentIsEditing(!contentPageIsEditing);
                // test: end
              }}
            >
              AAA
            </div>
          ) : (
            ""
          )
        }

        {isLoggedIn ? (
          <div className="btn btn-signout" onClick={signOut}>
            SignOut
          </div>
        ) : (
          <div className="btn btn-signin" onClick={logIn}>
            LogIn
          </div>
        )}
        {isLoggedIn && currentSplitLoc == "right" ? (
          <div className="btn" onClick={clickSaveContentPage()}>
            <span
              className={"btn-spinner" + (isSaving ? " active" : "")}
              style={{ position: "relative", top: "0.2em" }}
            >
              <svg
                style={{
                  "---svg-fill": "grey",
                  width: "0.8em",
                  height: "0.8em",
                }}
              >
                <use href="#svg-loading" />
              </svg>
            </span>
            <span>Save</span>
          </div>
        ) : (
          ""
        )}
        {isLoggedIn && currentSplitLoc == "left" ? (
          isEditing ? (
            <div className="btn btn-viewmode" onClick={toggleEditMode}>
              View Mode
            </div>
          ) : (
            <div className="btn btn-editmode" onClick={toggleEditMode}>
              Edit Mode
            </div>
          )
        ) : (
          ""
        )}
        {isLoggedIn && currentSplitLoc == "left" && isEditing ? (
          <div
            className={"btn" + " default-hide" + (isSaving ? " active" : "")}
            onClick={mainPageSave}
          >
            <span
              className={"btn-spinner" + (isSaving ? " active" : "")}
              style={{ position: "relative", top: "0.2em" }}
            >
              <svg
                style={{
                  "---svg-fill": "grey",
                  width: "0.8em",
                  height: "0.8em",
                }}
              >
                <use href="#svg-loading" />
              </svg>
            </span>
            <span>Save</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </StyledFloating>,
    document.querySelector(portalTarget || "#root-fix-header")
  );
}

export const Header = forwardRef(function (props, ref) {
  //forward state here
  const { currentSplitLoc, leftContentRef, rightContentRef } =
    useContext(SplitContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const { firebase } = useContext(globalContext);
  const controlRef = React.useRef(null);
  useImperativeHandle(ref, () => ({
    simpleConsole: () => {
      console.log("simpleConsole");
    },
    innerStates: {
      // pseudo field key defined/used
      _isSaving: [isSaving, setIsSaving],
      _isEditing: [isEditing, setIsEditing],
    },
    //rawRef
  }));

  const logIn = () => {
    firebase.firebaseGSignin();
    // .then(()=>{
    //     setIsLoggedIn(true)
    // })
  };
  const signOut = () => {
    firebase.firebaseGSignout();
    //setIsLoggedIn(false)
  };
  const mainPageSave = () => {
    console.log("mainPageSave");
    setIsSaving(true);

    // saving opration here

    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };
  const clickSaveContentPage = () => {
    let busySaveContentPage = false;
    return () => {
      if (busySaveContentPage) {
        return;
      }
      busySaveContentPage = true;
      console.log("props save", props);
      const { _categoryState, _tagState, _topicState } =
        props.leftContentRef.current.innerStates;
      const [categoryState, setCategoryState] = _categoryState;
      const [tagState, setTagState] = _tagState;
      const [topicState, setTopicState] = _topicState;
      setIsSaving(true);

      storeMainContent(
        firebase,
        TARGET_COLLECTION,
        categoryState,
        tagState,
        topicState
      ).then(() => {
        busySaveContentPage = false;
        setIsSaving(false);
      });
    };
  };

  const toggleEditMode = () => {
    const [mainPageIsEditing, setMainPageIsEditing] =
      leftContentRef.current.innerStates._isEditing;

    setIsEditing(!isEditing);
    setMainPageIsEditing(!mainPageIsEditing);
  };

  useEffect(() => {
    let resize = window.addEventListener("resize", () => {
      setWinWidth(window.innerWidth);
      console.log("resize", window.innerWidth);
    });
    console.log("resize1", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    const injectBodyClassViaViewport = () => {
      const body = document.querySelector("body");
      const classList = body.classList;
      // the way to get vw is different in different platform
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      if (vw > 992) {
        classList.add("p-size-lg");
        classList.remove("p-size-md");
        classList.remove("p-size-xs");
      } else if (vw > 768) {
        classList.remove("p-size-lg");
        classList.add("p-size-md");
        classList.remove("p-size-xs");
      } else {
        classList.remove("p-size-lg");
        classList.remove("p-size-md");
        classList.add("p-size-xs");
      }
    };
    injectBodyClassViaViewport();
    window.addEventListener("resize", injectBodyClassViaViewport);

    firebase.self.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
        if (rightContentRef.current) {
          const [contentPageIsEditing, setContentIsEditing] =
            rightContentRef.current.innerStates._isEditing;
          setContentIsEditing(true);

          // make sure tag state is loaded
          if (
            rightContentRef.current.innerRefs.innerIncMenuRef.current
              ?.innerStates
          ) {
            const { _tagState } = props.leftContentRef.current.innerStates;
            const [tagState, setTagState] = _tagState;
            const [rightContentOptions, setRightContentOptions] =
              rightContentRef.current.innerRefs.innerIncMenuRef.current
                .innerStates._data;
            setRightContentOptions(tagState.data);
          }
        }
      } else {
        setIsLoggedIn(false);
        if (rightContentRef.current) {
          const [contentPageIsEditing, setContentIsEditing] =
            rightContentRef.current.innerStates._isEditing;
          setContentIsEditing(false);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("firebaseEndpoints", props.leftContentRef);
      // firebaseEndpoints.authed.setStore(
      //     firebase,
      //     'test_random',
      //     {}
      // )
    }
    if (rightContentRef.current) {
      // sync the states
      const [contentIsLoggedIn, setContentIsLoggedIn] =
        rightContentRef.current.innerStates._isLoggedIn;
      setContentIsLoggedIn(isLoggedIn);
    }
  }, [isLoggedIn]);
  const fromParentArgs = {
    rightContentRef,
    isLoggedIn,
    setIsLoggedIn,
    isSaving,
    isEditing,
    toggleEditMode,
    signOut,
    logIn,
    clickSaveContentPage,
    mainPageSave,
    currentSplitLoc,
  };
  return (
    <>
      <Styled>
        <RainScene />
        {/* <Link to="/">Atticstone.V2</Link> */}
        <HeaderFloating fromParentArgs={fromParentArgs}></HeaderFloating>
      </Styled>
      <div
        id="header-inc"
        style={{ height: winWidth > 768 ? "0px" : "500px" }}
      ></div>
    </>
  );
});

// component mutate:
export const HeaderWithContext = WithContextFactory(Header);
export const HeaderWithContextWithForwardRef =
  WithContextWithForwardRefFactory(Header);
