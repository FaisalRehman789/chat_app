/** @format */

import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./Detail.css";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="data:image/webp;base64,UklGRvIPAABXRUJQVlA4IOYPAADQRgCdASqHAJ4APuFWo00opKMiNJiNeRAcCWoAxNZQ3N6s5z+PWRB9u+N6StvN5rvNz9OP969KPqgPQA6Xb9xfSj0yCWhyjxv9LouVx3Zk7QZkkNx+i6wyx1Ir6x3gQfhiYSxcSXYZWbQ0HthsUPkksFQO8mKoDlhaZIqUrHIyuA7fawZ5I8MifBByOyz2zwsxHm+BzVTckF3KeGqhysmCm/bKWfgmmyHjdT/bup3tCNqQ9NMjCFUGlXDpg8DJTjbl1Ka6P5e9FICiWKllDBNez0yDIISa54jaSO5BFx4BHr3L7EjjfRkIzB1UHWWMl/5CClDmDow6WCNW3EBoHU86V36b6DlIMScd7ds+NFk9HuUHemc/hDwOfUv04Ai05vfR1y0Z/p0YTCe8ZLAnYylb0opUF9ewgIpebYM5rMMrfLTCrPxLHxX/9i2K9rmTJCqPfkf7CRSeUBcpvBUOsi3IgqbLNKVrjGHz6Af2pNgt0XqNwwLPpa/yhj8kJ4cKjlqu2F/lFp8nfLc2sYFyd/gfv84hNT6cKkJDmmdY/6nbsyrlAx4PgR95j/Ynt30CPCFKe5QfAyEOvIBbWqL75pswOe0homW0c0ABvlzAY91jk1mzpKbqh9iv3B8RUINoW1ox76KjOS9VhyILyhb9Utuo7gNVh4vAAeALhV8NIMK7mEXeJX2Rr2P//0NG6NynTDhim0j8kiVS/2k1Mh5fAFd5rscrklQN8biQNq4gOyBmja/KkV0C6oo75lRihUfXgAD+4B93FXlJ98eRaQpVd5eBYdqoQAfo2t/8GFd/KuOFWi2Y7G4gyYnzvrEBZBV7bJMKbQiU3FQaglhUCWOq+j/JgtD62ioO1qENPSUrM8yzI3nFIoZYMST9UicfoYolzhCEzJHoZRuGBxzCT0B1DnCCYDMBdladE7IMP5iOTiH1VqoPTbAeBrMOOfYthOWhO15cLoVFE+j2T4JlMIuytO4FX0vlGNYRPg8ItG55kvq13Nc/XfMhufxdNyprznTPeWv8fXBBSORP3QWnvw/gQrlMEiPB+IcIwmJ/BltVV3LljU7M+81jiBhk1Ci9VU08W3C2ifyph3kM1WboKD3DuALUXCzFshS7W8usJUzZ2xD/OS/TkNrwBEx6LurL6d232pz9U8nONnr5B4UF7TEYsknwzDZ6fRn1cRAnBre2C7s6EOf1+Oqgo7zAHa3lzQb3ax+NletLsB1L52QG6oZYkDAWxxWzEXx2pFcWFTi+266XuKh01/n/Lbc+L93FV3e0dK7YkpFYR4ClypLm6oM+UEDirZvApy1caK7yRtDZTzHxmktY3+eYQ5zq8btwDtTPVWr9HejzESs2t6HPF4uF+s1iHqA+85hf4ulu4X+Dz/h9ZwbiHNJeWGrGsLmMEpveTmFelA+G2YvfRx3wQ82L7U0zeo5KQiD79Td6qp2K9u2EGxvspXzBOfZfog5mO9OaYA7iuY0AyO2kw5pfkzRrPYKnDZ/hJj131QHWCl9APwKkGkolDsIOze5yK1k/PkILDtArFLO5sRpRRb48ubp5QMcWiKfBiXyXYgoTs9BshFWlXdmXm9U/7DyT8JiOf63PSPftOVNMv0RFqSG6BTj+eqY5Rt7UqMCNk5l+YgcqJ+vFCFIZoIa2XofWNCtsoUHjJVK+DOaH9IePW8Jg6nWmVRglUbmJIE/I2b4TRmGupPpZBCmjE2RRRRBFWAlhAQrjE2ihysbdiSazCL73hypg0lQD9RaWrBIQdPf3VgrEJnqgOw0XyenkbqMmoFIXeEGUKqJzs7puNpno16CWpJPDkBPisUc3TOQ+ok0Wlqf4FOcZw5BRAhCIcva068CxXffJg7t41KpqcYJIbmVRAGgE8bn6QozOWOQEUHMOf1AS2neCWn7Co6nMVAqnXWTr8el166mKWkIAfTMOwng1X4M+Jg5h7f/IJrhnITV9jzoZ9Af5FBn5mQ1r8QC14Mlh+K0NxYLdCzq6Szm57BRPHiQfwbZHtX5QoXfxgbgY0nXSNzgFIPBuLmq3z0ybQePE7KvIeKUD//RF4PeeP/BSayGXaiJxjbk000T0H7n/YeiAR5gnr+opNJCDORco3lDnHxYshP3xddeh3K2yMM4/eCKGmvXUBnRLAuiPXLXpIHq96tscN6KDha8hFs0lf/Bq+XffJNfmvGNN9EEaoWJO+adlt6mZdkk74P6QXE4nPYwzs/m5a3yE+co74ddLDzNECLP6HqKuKVMrDyhX6Ju0t08pQQR+ijs2brtocy/3HC7AYHdIS88NzXCrs65K+2aJYDjmlFn90lo5gMAEU3ZVYQTnCgF1Ic0Nz8rqJxno8AM5h/93fqvKVvRDZ3b2krIZPx3J+wUfOpbWtS1rCoCGPwToPfZOVQP7Qxc5AfIu1P2COnrxj1/eoc06qXHUA7a/QKR5++J702DiuOjhlGesSwfsDyyE2sCBZahgqWYt0FoerQp3xMb8I28/O9j9dcxu5I4mIXehSBaX3r0/YDckQEc2glC6eUv57Utuv8WeGON2rVu+mhk1OKetZL2pDiawQfFKrfzs+C3d0jWGQ5z/22N6dN3gkFLEswuO4aJfujvManqX1/N8mXc/EAS+419g/MKjxZVrTfo5LqIsZ/wOVjBG5cu7cmTXXFCSLKnhWjXrD4b9V5D9iilVgrtCWOnEPfauND7w8eZ7dFF7ot2v9rREZ3sPwNZ1ifCzQWW/PQxVPd9x6FMX3LXCYFlZb3GqAH+kyquy+u0k0L1dFTKDAWVA+bpOnIO9YzHH55TlUwCJZoZ0bsNALLBbHWTgg2mygDoauogYC9FKL2SUDe8tmK4xPtGEPzlo6l6hV2viIPiTOEM5FwVi4y2nZKSmKMcOvPkMHisEUmFkPtXU33tCfPanRaM9NtpJth4+QRSYucEQ7hzd2IYgZefJ1s1KnMT+hifRXt9K0ILQB/JOPXZipqa3sHpPLBsTVioIj75mo9E/lLsClstHFxWpa1+0esr6BNaLgMhGhH+x8PHY3kFgvM4YwXHbRMwtu4tvARio0vb6NxXZLnbJOiLIYDMehxM9IL96COFccDgCDMpnyIqBiZypuG/Ds3XSCkCLRpzU0H16mBvdSCLBu/vuEE80kVDzPoea2jpF6EInVf4daQDfH7UYSMgoQQOUEfdBfVEu2FCfz8sAwb8moa2dZmIIahqMVzGiWjJyNToyVk9+NyTL+SJiQzYXcBaRIZRyEdyZl2GmU/l6hrd6PuOSR9+i4tnJdPRuO3NkRV4Z2IW++Am+ZRKBGID0qutdp6voNrbRJxMBFpbJc1L6lnyjETjyOd4ESUQKnp9sT00LHT7wbEzYC5/o6A+jDc3BQc6tv+tmogWsU39dEYox6bPS20BZrc4epMOuX3Z/dluwhP9awO9GIpAvkxXqItU6d7v1TabXk0FBIK182bEmabuK8XtjD2CQalDzHpTpfiIXu9DaxvLwxSeeegTUb7RMjhsHQt88hV2utE0iTzNm2/puKCYLYY2kFGMKaWqhshvmFEbTixUaadi3x6kxeMLmElgGOdZBt6dePvjVsyrnjyKOrOxIJq5sWPdyo60qpItbr5zM/HICApaa9xr30Uqa9iq52GOTwrzi3fshqBlKftij38aF/foZ+Cmmt7Fm9mVNJjVc1J34ivq/46uYoS2w51SvM7SM8oRVlNrISYdwSPe47r+m5fOUnQAO3GWCVHMCykswRxUL2Ors/CFTKcuHoNOSj984L5FPO+e+8gOuRxqThlwnMPR0aEtOF4ctxPK55JKfyuZkjQfV68G2GhE3gI8IF0v/evNrarWrPRq2TSNl9dO2GoDllkp3hVnjeYZByCCBe0a9InsBBgfBkHYFWocEgbeMBcbI7Iua/PzjkDDS4lyHEQPVMJlxE7r8ugRFeNdp+au2bT0FLJ4oh2izK4FH+9aJuGwNXWSPJWxu0/cDi7GUms60k7BXhjb3Zb71P0Co+UyW1sgPNy/fRm4aZX4/5G1bhrfHseDVyo5/2ytEq+mq0BUx0Ef+35KR05i2HAjkvgVumS6YVRFuNcZWe4dd2bH9JJh8ZPlSBvaERB5a1quWyURk81OYsGA8eL0FH5LcWzi8VEjCPyR9e9AAVsIlddSJRq0r2cKeQsCxcivFq8/vPwfNOD5c4gPHBW75Ey5H5CEb7XKlFSsZay82X9WPvVvN5+EaleGwW+KZVB42vlctqLqZlHiWTtIldQ8jgLt5Wh4KWcaSGPv8llvnA7Dau9YPPNqBWnGPHMkjlt9Z1v2VQVzVA44HK91Ak33HU+inL/LAbgcpEAHERtjaZfDldI7ZPM05ji3a5mPp4BmddQ2MQRDz5pWLbHW6VpnhQo4QDtHJEBxGvV+J7t3r6PIVWXVW9efYG6saQcTG4o+whz8vRy4SvLL8ubNs7KtP0subvEDQ+Mhj+tdV/UjELr/UWkzsbcbsUOAnIV7Tia63t5Q41S/8jubaC2TX/7ErIJfmQgpMDlE6HhytMJwX10RFB6R4rvZO0VRAqNiLVT8shnN4/NqQQO1NbxTxrSIKZAZFFTnL4RySngXN6gj2xLTy5nSldKd44ETgWycFbSytLBPgj3Au1CnVM6S7r44DTudkIt1FN1Wkpd2Tqpw7PM2Wz3anCOGbmnidDU6n5OgJAEke2GhCxzA19X2IwhvNAK5UkzDGtUpusAnN4ET8q8YXU02a5Q5kd/4eNqUFRfX/bYcNrK/S0eRO3e/vi1xMe3/S6pH63HAb0AVu0TEcOU9op60+41KMgn9T0OAthf1oJvbD+RsgeQDGACZXoeTh+lSNyIfMc9NHvERQ8RyVmlDd9HLPgA6tMBdq3iguIeOZKr7j2rRx7p19tQ0heS+ooT4S2IVSLOGhOfT+z+b5AlgChDfv4uaYefBjIS3B8CM5j9aZtJRjNebYXttUrxrtkgUxg6m6gZXEYLdtnLy1l28kF109C1bHGF8IBkaYCDSIPQeRHfS/7H03rTr5nBhW/3HjFpZM3dr9oXl0prWpjeSjrayxvY3TlEYc0zMtuvIrfjDtII0hfrDQnlCFki91JXs/bcfA2OiOfWzeiBF9vEQibukXixdR5KA1PtSvQQuK3mEncNRSugAUGqIPZ3PT+rqE0AlBPOqh2dma8EPUAwnJ4gkIfuxseww2PbVs7kkTBGZ/+vHz0MjlQUHQ/iPjbwp71Acn+lDwXv5MFvRsp3WY5EXQjdnUVtQP3FMq/f19xBprMSgCZHFeJbvXuYLPhaG7enuo6wg5rmuEd0eiGqAr3D1jue6Yi3rLwIbcBRwwNwyuykbWVuLrOA5h6dIRwpKr2GASQTEpzcAYlC7TSe58PWu55VSVs+G/Edr5P+apHKqg8KHueMPmv2WXQ2ZG+6Y1jBsCXKtgsuUHBdYuQ60tq7BF/OYyTYtDZ9vKpgAAAA=="
                  alt=""
                />
                <span>Photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked!"
            : "Block User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
