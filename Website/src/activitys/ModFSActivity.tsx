import { Alert, Box, Button, Divider, List, ListItemText, ListSubheader, Stack, TextField, Typography } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { useActivity } from "@Hooks/useActivity";
import { ModFS, useModFS } from "@Hooks/useModFS";
import { Shell } from "@Native/Shell";
import { DialogEditTextListItem } from "@Components/DialogEditTextListItem";
import React from "react";
import { Anchor } from "@Components/dapi/Anchor";
import { useStrings } from "@Hooks/useStrings";
import FlatList, { FlatListProps } from "flatlist-react";

interface ModFSSections {
  sectionText: string;
  items: ModFSListItem<keyof ModFS>[];
}

interface ModFSListItem<K extends keyof ModFS> {
  confKey: K;
  text: React.ReactNode;
  dialogDesc?: React.ReactNode;
  /**
   * Used for the config requirement
   */
  logoText?: string | Array<string>;
  disabled?: boolean;
  multiline?: boolean;
  maxRows?: number;
}

function ModFSActivity() {
  const { context } = useActivity();
  const { strings } = useStrings();

  const { _modFS, setModFS } = useModFS();

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>{strings("modfs")}</Toolbar.Center>
      </Toolbar>
    );
  };

  const items: ModFSSections[] = React.useMemo<ModFSSections[]>(
    () => [
      {
        sectionText: "Installer",
        items: [
          {
            text: "Explore install script",
            multiline: true,
            maxRows: 10,
            dialogDesc: (
              <>
                <Typography>
                  Check the{" "}
                  <Anchor href="https://github.com/DerGoogler/MMRL/tree/master/docs" noIcon>
                    ModFS documentations
                  </Anchor>{" "}
                  for more informations!
                  <br />
                  <code>{"<URL>"}</code>, <code>{"<URLS>"}</code> and <code>{"<MODID>"}</code> can also be used, shell supported.
                </Typography>
              </>
            ),
            confKey: "EXPLORE_INSTALL",
          },
          {
            text: "Local install script",
            multiline: true,
            maxRows: 10,
            dialogDesc: (
              <>
                <Typography>
                  Check the{" "}
                  <Anchor href="https://github.com/DerGoogler/MMRL/tree/master/docs" noIcon>
                    ModFS documentations
                  </Anchor>{" "}
                  for more informations!
                  <br />
                  <code>{"<ZIPFILE>"}</code> and <code>{"<ZIPFILES>"}</code> can also be used, shell supported.
                </Typography>
              </>
            ),
            confKey: "LOCAL_INSTALL",
          },
        ],
      },
      {
        sectionText: "Command line interfaces",
        items: [
          {
            text: "Magisk install CLI",
            disabled: !Shell.isMagiskSU(),
            logoText: "assets/MagiskSULogo.png",
            confKey: "MSUCLI",
          },
          {
            text: "Magisk Busybox CLI",
            disabled: !Shell.isMagiskSU(),
            logoText: "assets/MagiskSULogo.png",
            confKey: "MSUBSU",
          },
          {
            text: "Magisk ResetProp CLI",
            disabled: !Shell.isMagiskSU(),
            logoText: "assets/MagiskSULogo.png",
            confKey: "MSURSP",
          },
          {
            text: "KernelSU install CLI",
            disabled: !Shell.isKernelSU(),
            logoText: "assets/KernelSULogo.png",
            confKey: "KSUCLI",
          },
          {
            text: "KernelSU Busybox CLI",
            disabled: !Shell.isKernelSU(),
            logoText: "assets/KernelSULogo.png",
            confKey: "KSUBSU",
          },
          {
            text: "KernelSU ResetProp CLI",
            disabled: !Shell.isKernelSU(),
            logoText: "assets/KernelSULogo.png",
            confKey: "KSURSP",
          },
          {
            text: "APatch install CLI",
            disabled: !Shell.isAPatchSU(),
            logoText: "assets/APatchSULogo.png",
            confKey: "ASUCLI",
          },
          {
            text: "APatch Busybox CLI",
            disabled: !Shell.isAPatchSU(),
            logoText: "assets/APatchSULogo.png",
            confKey: "ASUBSU",
          },
          {
            text: "APatch ResetProp CLI",
            disabled: !Shell.isAPatchSU(),
            logoText: "assets/APatchSULogo.png",
            confKey: "ASURSP",
          },
        ],
      },
      {
        sectionText: "Default paths",
        items: [
          {
            text: "Base path",
            confKey: "ADB",
          },
          {
            text: "MMRL path",
            confKey: "MMRLFOL",
          },
          {
            text: "Modules path",
            confKey: "MODULES",
          },
          {
            text: "Module work directory",
            confKey: "MODULECWD",
          },
          {
            text: "Module properties path",
            confKey: "PROPS",
          },
          {
            text: "Module system properties path",
            confKey: "SYSTEM",
          },
          {
            text: "Module SEPolicy rules path",
            confKey: "SEPOLICY",
          },
        ],
      },
      {
        sectionText: "Service paths",
        items: [
          {
            text: "Late service path",
            confKey: "LATESERVICE",
          },
          {
            text: "Post service path",
            confKey: "POSTSERVICE",
          },
          {
            text: "Post mount service path",
            disabled: !(Shell.isKernelSU() || Shell.isAPatchSU()),
            logoText: ["assets/KernelSULogo.png", "assets/APatchSULogo.png"],
            confKey: "POSTMOUNT",
          },
          {
            text: "Boot complete service path",
            disabled: !(Shell.isKernelSU() || Shell.isAPatchSU()),
            logoText: ["assets/KernelSULogo.png", "assets/APatchSULogo.png"],
            confKey: "BOOTCOMP",
          },
        ],
      },
      {
        sectionText: "Status paths",
        items: [
          {
            text: "Skip mount path",
            confKey: "SKIPMOUNT",
          },
          {
            text: "Disable path",
            confKey: "DISABLE",
          },
          {
            text: "Remove path",
            confKey: "REMOVE",
          },
          {
            text: "Update path",
            confKey: "UPDATE",
          },
        ],
      },
      {
        sectionText: "ModConf",
        items: [
          {
            text: "Config working directory",
            confKey: "CONFCWD",
          },
          {
            text: "Config index file",
            confKey: "CONFINDEX",
          },
          {
            text: "ModConf Playground Root",
            dialogDesc: (
              <>
                <Typography>
                  Check the{" "}
                  <Anchor href="https://github.com/DerGoogler/MMRL/tree/master/docs" noIcon>
                    ModConf documentations
                  </Anchor>{" "}
                  for more informations!
                </Typography>
              </>
            ),
            confKey: "MODCONF_PLAYGROUND",
          },
          {
            text: "ModConf Playground Module ID",
            confKey: "MODCONF_PLAYGROUND_MODID",
          },
        ],
      },
      {
        sectionText: "ModConf Standalone",
        items: [
          {
            text: "Standalone root directory",
            confKey: "MCALONE",
          },
          {
            text: "Standalone working directory",
            confKey: "MCALONECWD",
          },
          {
            text: "Stadnalone meta file",
            confKey: "MCALONEMTA",
          },
        ],
      },
    ],
    []
  );

  const [search, setSearch] = React.useState("");

  const handleSearch = () => {};

  return (
    <Page renderToolbar={renderToolbar}>
      <Page.RelativeContent zeroMargin>
        <Alert sx={{ m: { xs: 1, md: 1 }, whiteSpace: "normal" }} severity="error">
          I am not responsible for anything that may happen to your phone by changing these informations. You do it at your own risk and
          take the responsibility upon yourself and you are not to blame us or MMRL and its respected developers
        </Alert>

        <TextField label="Search" variant="outlined" sx={{ m: 1 }} onChange={(e) => setSearch(e.target.value)} />

        <FlatList
          list={items}
          renderItem={(section) => (
            <>
              <List subheader={<ListSubheader>{section.sectionText}</ListSubheader>}>
                <FlatList
                  list={section.items}
                  search={{
                    by: ["text", "confKey", "dialogDesc"],
                    onEveryWord: true,
                    caseInsensitive: true,
                    term: search,
                  }}
                  renderItem={(item) => (
                    <DialogEditTextListItem
                      inputLabel="Path"
                      type="text"
                      title={item.text}
                      disabled={item.disabled}
                      description={item.dialogDesc}
                      initialValue={_modFS[item.confKey]}
                      onSuccess={(value) => {
                        if (value) {
                          setModFS(item.confKey, value);
                        }
                      }}
                      multiline={item.multiline}
                      maxRows={item.maxRows}
                    >
                      <ListItemText
                        primary={
                          <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
                            <Typography variant="caption">{`<${item.confKey}>`}</Typography>
                            <Typography sx={{ fontSize: "unset" }}>
                              {" "}
                              <Box sx={{ display: "flex", alignItems: "center", justifyItems: "center", whiteSpace: "normal" }}>
                                {item.logoText && Array.isArray(item.logoText) ? (
                                  <>
                                    <AvatarGroup sx={{ mr: 1 }}>
                                      {item.logoText.map((logo) => (
                                        <Avatar sx={{ borderRadius: "unset", width: "1rem", height: "1rem" }} src={logo} />
                                      ))}
                                    </AvatarGroup>
                                  </>
                                ) : (
                                  item.logoText && (
                                    <Avatar sx={{ borderRadius: "unset", mr: 1, width: "1rem", height: "1rem" }} src={item.logoText} />
                                  )
                                )}
                                {item.text}
                              </Box>
                            </Typography>
                          </Stack>
                        }
                        secondary={_modFS[item.confKey]}
                      />
                    </DialogEditTextListItem>
                  )}
                  renderOnScroll
                  renderWhenEmpty={() => <></>}
                />
              </List>
              <Divider />
            </>
          )}
          renderOnScroll
          renderWhenEmpty={() => <></>}
        />
      </Page.RelativeContent>
    </Page>
  );
}

export default ModFSActivity;
