import { HomeAssets } from "../../assets/Home/HomeAssets"

const QuickToolsAndCard = ()=>{
    return (
      <div className="">
        <div className="px-12">
          <p className="text sm:text-2xl font-semibold my-3">QuickTools</p>
          <p className="">
            Quickly reach the health services that matter most to you.
          </p>
        </div>
        <div className="w-[100%] flex flex-col  md:flex-row items-center justify-center gap-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className=" text-center rounded-lg shadow-lg">
              <img
                className="m-auto"
                src={HomeAssets.UploadReport}
                alt="Evidence-based Preventive Well-being Programs"
              />
              <h1 className="mt-4 font-semibold">Upload Report</h1>
            </div>
            <div className="p-5 text-center rounded-lg shadow-lg">
              <img
                className="m-auto"
                src={HomeAssets.FamilyMember}
                alt="Evidence-based Preventive Well-being Programs"
              />
              <h1 className="mt-4 font-semibold">Add Family Member</h1>
            </div>
            <div className="p-5 text-center rounded-lg shadow-lg">
              <img
                className="m-auto"
                src={HomeAssets.ReferToFriends}
                alt="Evidence-based Preventive Well-being Programs"
              />
              <h1 className="mt-4 font-semibold">Refer to Friends</h1>
            </div>
            <div className="p-5 text-center rounded-lg shadow-lg">
              <img
                className="m-auto"
                src={HomeAssets.Archives}
                alt="Evidence-based Preventive Well-being Programs"
              />
              <h1 className="mt-4 font-semibold">Upload Report</h1>
            </div>
            <div className="p-5 text-center rounded-lg shadow-lg">
              <img
                className="m-auto"
                src={HomeAssets.HealthCard}
                alt="Evidence-based Preventive Well-being Programs"
              />
              <h1 className="mt-4 font-semibold">Print Health Card</h1>
            </div>
            <div className="p-5 text-center rounded-lg shadow-lg">
              <img
                className="m-auto"
                src={HomeAssets.Scheduler}
                alt="Evidence-based Preventive Well-being Programs"
              />
              <h1 className="mt-4 font-semibold">Scheduler</h1>
            </div>
          </div>

          <div className="w-[45%] p-8 ">
            <div className="border rounded-xl">
              <div className="bg-[#007183] rounded-t-lg">
                <div className="flex items-center justify-between">
                  <img className="p-2" src={HomeAssets.Logo} alt="" />
                  <img className="p-2" src={HomeAssets.Logo} alt="" />
                </div>
              </div>

              <div className="p-2 flex justify-between">
                <div className="flex gap-3">
                  <img
                    src={HomeAssets.JohnProfile}
                    className="w-16 h-16"
                    alt=""
                  />
                  <div>
                    <p className="text-sm font-semibold">John Dsouza </p>
                    <p className="text-xs">
                      PHR ID :{" "}
                      <span className="text-xs font-semibold">ODYL834994</span>
                    </p>
                    <p className="text-xs">
                      Age :{" "}
                      <span className="text-xs font-semibold">34 Years</span>
                    </p>

                    <p className="text-xs">
                      Package :{" "}
                      <span className="text-xs font-semibold">Platinum</span>
                    </p>
                  </div>
                </div>
                <div>
                  <img src={HomeAssets.Qrcode} className="w-16 h-16" alt="" />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="p-2 flex flex-col gap-2">
                  <p className="text-sm font-semibold">Personal Detail</p>
                  <p className="text-xs">
                    Date Of Birth :{" "}
                    <span className="text-xs font-semibold">06/02/1990</span>
                  </p>
                  <p className="text-xs">
                    Blood Group :{" "}
                    <span className="text-xs font-semibold">A +ve</span>
                  </p>
                  <p className="text-xs">
                    Drug Allergies :{" "}
                    <span className="text-xs font-semibold">
                      Ace Inhibitors
                    </span>
                  </p>
                </div>

                <div className="p-2 flex flex-col gap-2">
                  <p className="text-sm font-semibold">Insurance Details</p>
                  <p className="text-xs">
                    Company :{" "}
                    <span className="text-xs font-semibold">
                      Al Hilal Life B.S.C
                    </span>
                  </p>
                  <p className="text-xs">
                    TPA :{" "}
                    <span className="text-xs font-semibold">
                      GEMS (33003300)
                    </span>
                  </p>
                  <p className="text-xs">
                    Policy No:{" "}
                    <span className="text-xs font-semibold">AL09876123456</span>
                  </p>
                </div>

                <div className="p-2 flex flex-col gap-2">
                  <p className="text-sm font-semibold">Emergency Contact</p>
                  <p className="text-xs">
                    Yvonne Gomes:{" "}
                    <span className="text-xs font-semibold">+973-77000335</span>
                  </p>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold">Physician Contact</p>
                    <p className="text-xs">
                      Yvonne Gomes:{" "}
                      <span className="text-xs font-semibold">
                        +973-77000335
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default QuickToolsAndCard