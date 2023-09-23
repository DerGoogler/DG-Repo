import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";

interface Props extends React.PropsWithChildren {
  width?: string | number;
  height?: string | number;
  sx?: SxProps;
}

export const MagiskSULogo = (props: Props) => {
  return (
    <Box
      component="svg"
      sx={props.sx}
      id="svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0, 0, 400,400"
    >
      <defs>
        <path d="M334 0L334 0L334 334L0 334L0 0L334 0Z" id="path_1" />
        <clipPath id="clip_1">
          <use xlinkHref="#path_1" clip-rule="evenodd" fill-rule="evenodd" />
        </clipPath>
      </defs>
      <g id="Group">
        <path
          d="M0 200C0 89.543 89.543 0 200 0C310.457 0 400 89.543 400 200C400 310.457 310.457 400 200 400C89.543 400 0 310.457 0 200Z"
          id="Oval"
          fill="#00B19D"
          fill-rule="evenodd"
          stroke="none"
        />
        <g id="magisk" clip-path="url(#clip_1)" transform="translate(33.151855 42.999977)">
          <path d="M334 0L334 0L334 334L0 334L0 0L334 0Z" id="magisk" fill="none" stroke="none" />
          <path
            d="M83.1381 191.98C95.0925 196.99 88.7465 179.428 110.053 163.479C122.049 154.489 157.537 128.882 150.008 134.185L150.008 134.171C111.514 161.322 71.5177 158.024 53.1616 98.9893C49.9051 88.5239 42.8632 175.1 83.1381 191.98L83.1381 191.98Z"
            id="Shape"
            fill="#F5CDD1"
            stroke="none"
          />
          <path
            d="M35.6965 171.982C30.269 164.384 49.1539 220.885 96.4427 221.567C131.095 222.068 135.131 188.056 158.233 187.026C165.205 186.72 166.694 175.781 167 172.177C166.945 171.551 166.931 171.105 166.931 171.105L167.098 170.938C167.084 170.925 157.147 160.167 144.594 163.744L144.58 163.757C123.399 169.797 115.175 198.869 93.7986 202.46C89.3731 203.197 84.4048 204.519 78.6016 204.241C67.7326 203.726 54.0108 197.672 35.6965 171.982L35.6965 171.982Z"
            id="Shape"
            fill="#113B37"
            stroke="none"
          />
          <path
            d="M250.723 191.98C290.984 175.113 283.942 88.5238 280.7 98.9892C262.344 158.024 222.347 161.336 183.853 134.171C176.338 128.868 211.812 154.475 223.808 163.465L223.808 163.479C245.115 179.428 238.755 196.99 250.723 191.98L250.723 191.98Z"
            id="Shape"
            fill="#F5CDD1"
            stroke="none"
          />
          <path
            d="M167 172.177C167.278 175.628 168.712 186.873 175.781 187.193C198.883 188.223 202.919 222.235 237.571 221.734C284.874 221.052 303.745 164.551 298.318 172.149C279.989 197.839 266.282 203.893 255.427 204.408C249.623 204.686 244.655 203.364 240.23 202.627C218.854 199.036 210.629 169.964 189.448 163.924L189.434 163.911C177.451 160.501 167.96 170.034 167.097 170.938L167 172.177L167 172.177Z"
            id="Shape"
            fill="#113B37"
            stroke="none"
          />
          <path
            d="M279.238 74.329C262.83 115.564 200.734 100.047 194.805 126.071C193.636 131.179 205.326 143.23 227.83 142.312C274.311 140.405 282.884 65.1301 279.238 74.329L279.238 74.329Z"
            id="Shape"
            fill="#1457C0"
            stroke="none"
          />
          <path
            d="M109.078 8.4056C99.4202 9.35193 74.9686 23.7696 79.4359 29.7399C103.108 61.4142 117.651 90.3609 145.025 112.53C148.699 115.508 128.617 82.0109 127.782 63.1677L127.768 63.1677C126.85 42.5293 118.737 7.45927 109.078 8.4056L109.078 8.4056Z"
            id="Shape"
            fill="#ECEFF1"
            stroke="none"
          />
          <path
            d="M106.017 142.298C128.534 143.216 140.21 131.165 139.041 126.057C133.113 100.033 71.0025 115.55 54.6087 74.3151C50.9625 65.1301 59.5352 140.405 106.017 142.298L106.017 142.298Z"
            id="Shape"
            fill="#1457C0"
            stroke="none"
          />
          <path
            d="M57.9908 62.2074C59.6886 76.4164 74.83 89.8599 95.0509 95.3291C116.677 101.188 141.95 114.59 141.95 114.59C111.5 95.6492 117.944 98.0289 101.021 80.3548C85.4623 64.114 73.6192 31.6325 73.6192 31.6325C73.6192 31.6325 56.7383 51.6169 57.9908 62.2074L57.9908 62.2074Z"
            id="Shape"
            fill="#FA8D3A"
            stroke="none"
          />
          <path
            d="M165.08 44.088C167.028 20.6941 152.569 6.31816 147.253 2.01791C141.95 -2.28234 131.777 1.01591 119.545 5.05175C133.392 14.4316 140.336 25.5927 142.257 40.8732C139.348 76.2077 158.539 93.4087 160.794 153.278L160.794 153.292C164.969 154.893 163.145 67.4819 165.08 44.088L165.08 44.088Z"
            id="Shape"
            fill="#FDC900"
            stroke="none"
          />
          <path
            d="M183.686 202.167C165.887 226.466 150.899 201.207 150.899 201.207C150.899 201.207 153.084 214.024 150.426 242.289C147.099 277.721 164.092 334 164.092 334C164.092 334 187.263 277.61 183.213 241.176C179.887 211.227 184.716 200.762 183.686 202.167L183.686 202.167Z"
            id="Shape"
            fill="#113B37"
            stroke="none"
          />
          <path
            d="M250.389 224.921C253.284 220.148 233.773 243.528 214.456 226.828C201.068 215.249 198.772 211.728 188.362 201.666C184.855 198.271 192.259 215.778 194.319 231.601L194.305 231.615C197.2 253.757 193.985 265.878 189.796 289.564C187.694 301.546 233.007 253.534 250.389 224.921L250.389 224.921Z"
            id="Shape"
            fill="#ECEFF1"
            stroke="none"
          />
          <path
            d="M232.826 80.3548C215.917 98.0289 222.333 95.6492 191.897 114.59C191.897 114.59 217.17 101.174 238.796 95.3291C259.003 89.8598 274.172 76.4164 275.856 62.2074C277.109 51.6308 260.228 31.6325 260.228 31.6325C260.228 31.6325 248.385 64.114 232.826 80.3548L232.826 80.3548Z"
            id="Shape"
            fill="#FA8D3A"
            stroke="none"
          />
          <path
            d="M144.859 203.448L144.845 203.434C134.435 213.495 132.125 217.016 118.751 228.595C99.4488 245.295 79.9237 221.915 82.8184 226.689C100.2 255.315 145.527 303.314 143.412 291.331C139.223 267.631 136.008 255.51 138.903 233.382C140.976 217.559 148.38 200.052 144.859 203.448L144.859 203.448Z"
            id="Shape"
            fill="#ECEFF1"
            stroke="none"
          />
          <path
            d="M186.581 2.04581C181.265 6.34606 166.819 20.722 168.754 44.1159C170.688 67.5098 168.851 154.92 173.054 153.306C175.308 93.4366 194.485 76.2356 191.591 40.9012L191.591 40.8733C193.525 25.5928 200.484 14.4317 214.303 5.05183C202.07 1.02991 191.883 -2.25442 186.581 2.04583L186.581 2.04581Z"
            id="Shape"
            fill="#FDC900"
            stroke="none"
          />
          <path
            d="M224.768 8.41959C215.11 7.47326 206.997 42.5572 206.078 63.1956C205.243 82.0388 185.147 115.536 188.835 112.558L188.821 112.544C216.182 90.3609 230.738 61.4282 254.411 29.7538C258.892 23.7836 234.44 9.36593 224.768 8.41959L224.768 8.41959Z"
            id="Shape"
            fill="#ECEFF1"
            stroke="none"
          />
        </g>
      </g>
    </Box>
  );
};
