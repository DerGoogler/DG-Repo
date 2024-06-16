import { Ansi } from "@Components/Ansi";
import { GestureDetector } from "@Components/onsenui/GestureDetector";
import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { useModFS } from "@Hooks/useModFS";
import { useNativeStorage } from "@Hooks/useNativeStorage";
import { useSettings } from "@Hooks/useSettings";
import { useStrings } from "@Hooks/useStrings";
import { BuildConfig } from "@Native/BuildConfig";
import { Shell } from "@Native/Shell";
import { view } from "@Native/View";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useConfirm } from "material-ui-confirm";
import { join } from "path";
import React from "react";

export interface TerminalActivityExtra {
  exploreInstall: boolean;
  modSource: string[];
  id: string;
  source?: string;
  issues?: string;
}

const InstallTerminalActivity = () => {
  const { context, extra } = useActivity<TerminalActivityExtra>();
  const { settings } = useSettings();
  const { strings } = useStrings();
  const { modFS, __modFS } = useModFS();

  const [fontSize, setFontSize] = useNativeStorage("term_font_size", 12);
  const [active, setActive] = React.useState<bool>(true);
  const [lines, setLines] = React.useState<any[]>([]);

  const confirm = useConfirm();
  const ref = React.useRef<HTMLDivElement>(null);

  const termEndRef = React.useRef<HTMLDivElement>(null);

  if (settings.term_scroll_bottom) {
    const termBehavior = React.useMemo(() => settings.term_scroll_behavior, [settings]);

    React.useEffect(() => {
      termEndRef.current?.scrollIntoView({ behavior: termBehavior.value, block: "end", inline: "nearest" });
    }, [lines]);
  }

  const processCommand = (rawCommand: string) => {
    let arg: string | any[];
    let command: string;
    console.log(rawCommand);
    const i = rawCommand.indexOf(" ");
    if (i != -1 && rawCommand.length != i + 1) {
      arg = rawCommand
        .substring(i + 1)
        .trim()
        .split(" ");
      command = rawCommand.substring(0, i);
    } else {
      arg = "";
      command = rawCommand;
    }

    switch (command) {
      case "clearTerminal":
        setLines([]);
        break;
      case "log":
        console.log(arg[0]);
        break;
    }
  };

  const addText = (props: object) => {
    setLines((lines) => [
      ...lines,
      {
        component: Ansi,
        props: {
          linkify: true,
          ...props,
        },
      },
    ]);
  };

  const addButton = (props: object) => {
    setLines((lines) => [
      ...lines,
      {
        component: Button,
        props: {
          variant: "contained",
          sx: {
            width: "50vmin",
            mt: 1,
            mb: 1,
          },
          ...props,
        },
      },
    ]);
  };

  const rebootDevice = React.useCallback(() => {
    const reason = "";
    confirm({
      title: strings("reboot_device"),
      description: strings("reboot_device_desc"),
      confirmationText: strings("yes"),
      cancellationText: strings("cancel"),
    }).then(() => {
      Shell.cmd(`/system/bin/svc power reboot ${reason} || /system/bin/reboot ${reason}`).exec();
    });
  }, []);

  // const install = () => {
  //   const { exploreInstall, modSource, id, source, issues } = extra;

  //   if (exploreInstall) {
  //     const url = modSource[0];
  //     const urls = modSource.join(" ");

  //     const envp_explore = {
  //       MMRL: "true",
  //       MMRL_VER: BuildConfig.VERSION_CODE.toString(),
  //       NAME: id,
  //       ROOTMANAGER: Shell.getRootManager(),
  //       ...__modFS,
  //     };

  //     Terminal.exec({
  //       command: modFS("EXPLORE_INSTALL", {
  //         URL: url,
  //         URLS: urls,
  //         MODID: id,
  //       }),
  //       cwd: "/data/local/tmp",
  //       env: envp_explore,
  //       printError: settings.print_terminal_error,
  //       onLine: (line) => {
  //         if (line.startsWith("#!mmrl:")) {
  //           processCommand(line.substring(7));
  //         } else {
  //           addText({ children: line.trim() });
  //         }
  //       },
  //       onExit: (code) => {
  //         switch (code) {
  //           case Shell.M_INS_SUCCESS:
  //             addText({ children: " " });

  //             addText({
  //               children:
  //                 "\x1b[93mYou can press the \x1b[33;4mbutton\x1b[93;0m\x1b[93m below to \x1b[33;4mreboot\x1b[93;0m\x1b[93m your device\x1b[0m",
  //             });

  //             addButton({
  //               children: "Reboot",
  //               startIcon: <RestartAltIcon />,
  //               onClick: rebootDevice,
  //             });

  //             addText({
  //               children:
  //                 "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m",
  //             });

  //             if (issues) {
  //               addText({
  //                 children: `> \x1b[32mIssues: \x1b[33m${issues}\x1b[0m`,
  //               });
  //             }

  //             if (source) {
  //               addText({
  //                 children: `> \x1b[32mSource: \x1b[33m${source}\x1b[0m`,
  //               });
  //             }

  //             setActive(false);
  //             break;

  //           case Shell.M_INS_FAILURE:
  //             addText({ children: " " });

  //             addText({
  //               children:
  //                 "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m",
  //             });

  //             if (issues) {
  //               addText({
  //                 children: `> \x1b[32mIssues: \x1b[33m${issues}\x1b[0m`,
  //               });
  //             }

  //             if (source) {
  //               addText({
  //                 children: `> \x1b[32mSource: \x1b[33m${source}\x1b[0m`,
  //               });
  //             }

  //             setActive(false);
  //             break;

  //           case Shell.TERM_INTR_ERR:
  //             addText({ children: "! \x1b[31mInternal error!\x1b[0m" });
  //             setActive(false);
  //             break;

  //           default:
  //             addText({ children: "- Unknown code returned" });
  //             setActive(false);
  //             break;
  //         }
  //       },
  //     });
  //   } else {
  //     const zipfile = modSource[0];
  //     const zipfiles = modSource.join(" ");

  //     const envp_local = {
  //       MMRL: "true",
  //       MMRL_VER: BuildConfig.VERSION_CODE.toString(),
  //       NAME: id,
  //       ROOTMANAGER: Shell.getRootManager(),
  //       ...__modFS,
  //     };

  //     Terminal.exec({
  //       command: modFS("LOCAL_INSTALL", {
  //         ZIPFILE: zipfile,
  //         ZIPFILES: zipfiles,
  //       }),
  //       env: envp_local,
  //       printError: settings.print_terminal_error,
  //       cwd: "/data/local/tmp",
  //       onLine: (line) => {
  //         if (line.startsWith("#!mmrl:")) {
  //           processCommand(line.substring(7));
  //         } else {
  //           addText({ children: line.trim() });
  //         }
  //       },
  //       onExit: (code) => {
  //         switch (code) {
  //           case Shell.M_INS_SUCCESS:
  //             addText({ children: " " });

  //             addText({
  //               children:
  //                 "\x1b[93mYou can press the \x1b[33;4mbutton\x1b[93;0m\x1b[93m below to \x1b[33;4mreboot\x1b[93;0m\x1b[93m your device\x1b[0m",
  //             });

  //             addButton({
  //               children: "Reboot",
  //               startIcon: <RestartAltIcon />,
  //               onClick: rebootDevice,
  //             });

  //             addText({
  //               children:
  //                 "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m",
  //             });

  //             setActive(false);
  //             break;

  //           case Shell.M_INS_FAILURE:
  //             addText({ children: " " });

  //             addText({
  //               children:
  //                 "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m",
  //             });

  //             setActive(false);
  //             break;

  //           case Shell.TERM_INTR_ERR:
  //             addText({ children: "! \x1b[31mInternal error!\x1b[0m" });
  //             setActive(false);
  //             break;

  //           default:
  //             addText({ children: "- Unknown code returned" });
  //             setActive(false);
  //             break;
  //         }
  //       },
  //     });
  //   }
  // };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>{!active && <Toolbar.BackButton onClick={context.popPage} />}</Toolbar.Left>
        <Toolbar.Center>Install</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page
      onDeviceBackButton={(e) => {
        if (!active) {
          e.callParentHandler();
        }
      }}
      sx={{
        pl: 1,
        pr: 1,
        // removing bottom window insets
        pb: "0px !important",
      }}
      // onShow={install}
      modifier="noshadow"
      renderToolbar={renderToolbar}
    >
      {/* <GestureDetector
        onPinch={(e: any) => {
          setFontSize((init) => {
            const newFontSize = init * (1 + (e.gesture.scale - 1) * 0.5);
            return Math.min(Math.max(newFontSize, 12), 100);
          });
        }}
      > */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Stack
          sx={{
            whiteSpace: "pre",
            flex: "0 0 100%",
            color: "white",
            // fontSize: fontSize,
          }}
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={0}
        >
          {lines.map((line) => (
            <line.component {...line.props} />
          ))}
        </Stack>
      </Box>
      <Box sx={{ height: view.getWindowBottomInsets() }} ref={termEndRef} />
      {/* </GestureDetector> */}
    </Page>
  );
};

export default InstallTerminalActivity;
