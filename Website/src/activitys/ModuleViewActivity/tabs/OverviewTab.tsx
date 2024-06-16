import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import Box from "@mui/material/Box";
import React from "react";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Stack from "@mui/material/Stack";
import { useActivity } from "@Hooks/useActivity";
import ListItemText from "@mui/material/ListItemText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Chip from "@mui/material/Chip";
import DescriptonActivity from "../../DescriptonActivity";
import { useSettings } from "@Hooks/useSettings";
import ListItemButton from "@mui/material/ListItemButton";
import { useLowQualityModule } from "@Hooks/useLowQualityModule";
import AntiFeatureListItem from "@Components/AntiFeatureListItem";
import { Image } from "@Components/dapi/Image";
import { useCategories } from "@Hooks/useCategories";
import { useFormatDate } from "@Hooks/useFormatDate";
import { ModuleViewActivity } from "..";
import { useRepos } from "@Hooks/useRepos";
import { Carousel } from "@Components/onsenui/Carousel";
import { CarouselItem } from "@Components/onsenui/CarouselItem";
import { blacklistedModules } from "@Util/blacklisted-modules";

const OverviewTab = () => {
  const { strings } = useStrings();
  const { context, extra } = useActivity<Module>();
  const { settings } = useSettings();
  const { modules } = useRepos();
  const { id, name, version, versionCode, description, author, versions, track } = extra;

  const { filteredCategories } = useCategories(track.categories);
  const isLowQuality = useLowQualityModule(extra, !settings._low_quality_module);
  const latestVersion = React.useMemo(() => versions[versions.length - 1], [versions]);
  const formatLastUpdate = useFormatDate(latestVersion.timestamp);
  const [readme, setReadme] = React.useState<string | undefined>(undefined);

  const findHardCodedAntifeature = React.useMemo<Track["antifeatures"]>(() => {
    return [...(track.antifeatures || []), ...(blacklistedModules.find((mod) => mod.id === id)?.antifeatures || [])];
  }, [id, track.antifeatures]);

  React.useEffect(() => {
    if (track.readme) {
      fetch(track.readme)
        .then((res) => {
          if (res.status === 200) {
            return res.text();
          } else {
            return undefined;
          }
        })
        .then((text) => setReadme(text));
    }
  }, [track.readme]);

  return (
    <>
      <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={1}>
        {isLowQuality && (
          <Alert severity="warning">
            <AlertTitle>{strings("low_quality_module")}</AlertTitle>
            {strings("low_quality_module_warn")}
          </Alert>
        )}

        <Card
          sx={{
            width: "100%",
          }}
        >
          <CardContent>
            <Stack
              component={Typography}
              sx={{
                alignItems: "center",
              }}
              direction="row"
              justifyContent={{ xs: "space-between", sm: "row" }}
              spacing={1}
              gutterBottom
            >
              <Typography variant="h5" component="div">
                {strings("about_this_module")}
              </Typography>
              {readme && (
                <IconButton
                  onClick={() => {
                    context.pushPage({
                      component: DescriptonActivity,
                      key: "DescriptonActivity",
                      extra: {
                        desc: readme,
                        name: name,
                        logo: track.icon,
                      },
                    });
                  }}
                  sx={{ ml: 0.5 }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              )}
            </Stack>

            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography sx={{ mt: 3 }} variant="h6" component="div">
              {strings("updated_on")}
              <Typography sx={{ fontSize: "0.875rem" }} variant="body2" component="div" color="text.secondary">
                {formatLastUpdate}
              </Typography>
            </Typography>
            {filteredCategories.length !== 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px 12px",
                  mt: 3.5,
                }}
              >
                {filteredCategories.map((category) => (
                  <Chip label={category} variant="outlined" />
                ))}
              </Box>
            )}
          </CardContent>
        </Card>

        {findHardCodedAntifeature && findHardCodedAntifeature.length !== 0 && (
          <Card
            sx={{
              width: "100%",
            }}
          >
            <CardContent>
              <Stack
                component={Typography}
                sx={{
                  alignItems: "center",
                }}
                variant="h5"
                direction="row"
                justifyContent={{ xs: "space-between", sm: "row" }}
                spacing={1}
                gutterBottom
              >
                {strings("antifeatures")}
              </Stack>

              <List disablePadding>
                {typeof findHardCodedAntifeature === "string" ? (
                  <AntiFeatureListItem type={findHardCodedAntifeature} />
                ) : (
                  Array.isArray(findHardCodedAntifeature) && findHardCodedAntifeature.map((anti) => <AntiFeatureListItem type={anti} />)
                )}
              </List>
            </CardContent>
          </Card>
        )}

        {track.require && track.require.length !== 0 && (
          <Card
            sx={{
              width: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {"Dependencies"}
              </Typography>
            </CardContent>

            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column", // mobile
                  sm: "row", // tablet and up
                },
              }}
            >
              <List disablePadding sx={{ width: { xs: "100%" } }}>
                {track.require.map((req) => {
                  const findRequire = React.useMemo(() => modules.find((module) => module.id === req), [modules]);

                  if (findRequire) {
                    return (
                      <ListItemButton
                        onClick={() => {
                          context.pushPage({
                            component: ModuleViewActivity,
                            key: "ModuleViewActivity",
                            extra: findRequire,
                          });
                        }}
                      >
                        <ListItemText primary={findRequire.name} secondary={`${findRequire.version} (${findRequire.versionCode})`} />
                      </ListItemButton>
                    );
                  } else {
                    return (
                      <ListItem>
                        <ListItemText primary={req} />
                      </ListItem>
                    );
                  }
                })}
              </List>
            </Box>
          </Card>
        )}

        {track.screenshots && (
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {strings("images")}
              </Typography>
            </CardContent>

            <ImageList
              sx={{
                mt: 0,
                pt: 0,
                p: 1,
                overflow: "auto",
                whiteSpace: "nowrap",
                gridAutoFlow: "column",
                gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr)) !important",
                gridAutoColumns: "minmax(250px, 1fr)",
              }}
            >
              {track.screenshots.map((image, i) => (
                <ImageListItem
                  sx={(theme) => ({
                    ml: 1,
                    mr: 1,
                  })}
                >
                  <Box sx={{ width: "100%" }} component={Image} src={image} />
                </ImageListItem>
              ))}
            </ImageList>
          </Card>
        )}
      </Stack>
    </>
  );
};

export { OverviewTab };
